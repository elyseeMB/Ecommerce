import type { AccessLevels } from "@api/website/types";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { apiFetch } from "@helpers/website";
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  useConfirm,
  useDialogRef,
} from "@ui/website";
import React, { useMemo, useState } from "react";
import { useUpdateResources } from "../store.tsx";
import { useDeleteAccessLevels } from "../hooks/access_levels/useAccessLevels.ts";

interface AccessLevelWithId extends AccessLevels {
  tempId: string;
}

interface Props {
  items: AccessLevels[];
  onReorder: (newItems: AccessLevels[]) => void;
}

export function SortableList({ items, onReorder }: Props) {
  const itemsWithId: AccessLevelWithId[] = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        tempId: `${item.name}-${item.color}-${index}`.replace(
          /[^a-zA-Z0-9-_]/g,
          "",
        ),
      })),
    [items],
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeItem = itemsWithId.find((i) => i.tempId === activeId) || null;

  const handleDragEnd = ({ active, over }: any) => {
    setActiveId(null);
    if (active.id !== over?.id) {
      const oldIndex = itemsWithId.findIndex((i) => i.tempId === active.id);
      const newIndex = itemsWithId.findIndex((i) => i.tempId === over?.id);
      const newItemsWithId = arrayMove(itemsWithId, oldIndex, newIndex);
      onReorder(newItemsWithId.map(({ tempId, ...rest }) => rest));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id as string)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={itemsWithId.map((i) => i.tempId)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {itemsWithId.map((item) => (
            <SortableItem key={item.tempId} item={item} />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay>
        {activeItem && <Item item={activeItem} dragOverlay />}
      </DragOverlay>
    </DndContext>
  );
}

function SortableItem({ item }: { item: AccessLevelWithId }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.tempId });

  const [hovered, setHovered] = useState(false);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Item
        item={item}
        dragOverlay={isDragging}
        enableAction={hovered}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </li>
  );
}

function Item({
  item,
  dragOverlay,
  enableAction,
  dragHandleProps,
}: {
  item: AccessLevels;
  dragOverlay?: boolean;
  enableAction?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}) {
  const updateResources = useUpdateResources();
  const dialogRef = useDialogRef();
  const confirmDelete = useConfirm();

  const [deletAccessLevels, isDeleting] = useDeleteAccessLevels(item.id);

  const [name, setName] = useState(item.name);
  const [color, setColor] = useState(item.color);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();

    if ((item.name === name && item.color === color) || !item.name.trim()) {
      return;
    }
    setLoading(true);
    apiFetch<AccessLevels>(`/access-levels/${item.id}`, {
      json: { name, color },
      method: "PUT",
    })
      .then((d) => {
        updateResources("accessLevel", d);
        dialogRef.current?.close();
      })
      .catch((err) => {
        console.error("Erreur:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = () => {
    confirmDelete(
      () =>
        new Promise((resolve) => {
          deletAccessLevels({
            onCompletd: () => resolve(),
          });
        }),
      {
        message: "voulez-vous vraiment supprimé ?",
        title: "Suppresion",
      },
    );
  };

  return (
    <div
      className={`flex items-center gap-3 p-3 rounded-md transition bg-white hover:bg-gray-100 ${
        dragOverlay ? "shadow-lg scale-105" : ""
      }`}
    >
      <span
        className="w-5 h-5 rounded-full"
        style={{ cursor: "grab" }}
        {...dragHandleProps}
      >
        <Icon name="Draggable" />
      </span>

      <span
        className="w-5 h-5 rounded-full p-0 m-0"
        style={{ backgroundColor: item.color }}
      />
      <span className="flex-1">{item.name}</span>

      {enableAction && (
        <div className="flex items-center gap-3">
          <div className="p-0 flex items-center justify-center rounded hover: cursor-pointer">
            <Dialog
              title="Add Access Level"
              ref={dialogRef}
              trigger={<Icon name="Pencil" />}
            >
              <DialogDescription>Update Access Levels</DialogDescription>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <fieldset>
                  <Label
                    name="name"
                    label="Name Access Level"
                    placeholder="Name"
                    value={name}
                    onChange={(ev) =>
                      setName((ev.currentTarget as HTMLInputElement).value)
                    }
                  />
                </fieldset>

                <fieldset>
                  <Label
                    type="color"
                    name="color"
                    label="Color Access Levels"
                    placeholder="Color"
                    value={color}
                    onChange={(ev) =>
                      setColor((ev.currentTarget as HTMLInputElement).value)
                    }
                  />
                </fieldset>

                <div
                  style={{
                    display: "flex",
                    marginTop: 25,
                    justifyContent: "flex-end",
                  }}
                >
                  <Button disabled={loading} variant="primary" type="submit">
                    {loading ? "Update..." : "Save Changes"}
                  </Button>
                </div>
              </form>
            </Dialog>
          </div>
          <span onClick={handleDelete} className="cursor-pointer">
            <Icon color="red" name="Trash" />
          </span>
        </div>
      )}
    </div>
  );
}
