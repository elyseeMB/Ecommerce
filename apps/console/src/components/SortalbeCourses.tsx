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
import {
  Button,
  Dialog,
  DialogDescription,
  Icon,
  Label,
  useConfirm,
  useDialogRef,
} from "@ui/website";
import React, { useState } from "react";
import { useResource, type ResourceMap } from "../store.tsx";
import { useFetchResource } from "../hooks/resource/useFetchResource.ts";

type ResourseItem<T extends keyof ResourceMap> = ResourceMap[T];

type Props<T extends keyof ResourceMap> = {
  items: ResourseItem<T>[];
  onReorder: (newItems: ResourseItem<T>[]) => void;
  type: T;
};

export function SortableListCourses<T extends keyof ResourceMap>({
  items,
  onReorder,
  type,
}: Props<T>) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const activeItem = items.find((i) => i.id === activeId) || null;

  const handleDragEnd = ({ active, over }: any) => {
    setActiveId(null);
    if (active.id !== over?.id) {
      const oldIndex = items.findIndex((i) => i.id === active.id);
      const newIndex = items.findIndex((i) => i.id === over?.id);
      const newItems = arrayMove(items, oldIndex, newIndex);
      onReorder(newItems);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={(e) => setActiveId(e.active.id)}
      onDragEnd={handleDragEnd}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext
        items={items.map((i) => i.id!)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="space-y-2">
          {items.map((item) => (
            <SortableItem key={item.id} item={item} type={type} />
          ))}
        </ul>
      </SortableContext>

      <DragOverlay>
        {activeItem && <Item type={type} item={activeItem} dragOverlay />}
      </DragOverlay>
    </DndContext>
  );
}

function SortableItem<T extends keyof ResourceMap>({
  item,
  type,
}: {
  item: ResourseItem<T>;
  type: T;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id! });

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
        type={type}
        item={item}
        dragOverlay={isDragging}
        enableAction={hovered}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </li>
  );
}

function Item<T extends keyof ResourceMap>({
  item,
  type,
  dragOverlay,
  enableAction,
  dragHandleProps,
}: {
  type: T;
  item: ResourseItem<T>;
  dragOverlay?: boolean;
  enableAction?: boolean;
  dragHandleProps?: React.HTMLAttributes<HTMLElement>;
}) {
  const [handle, isLoading] = useFetchResource(type);
  const { update: updateResources, delete: deleteResource } = useResource(type);
  const dialogRef = useDialogRef();
  const confirmDelete = useConfirm();
  const [name, setName] = useState(item.name);
  const [color, setColor] = useState(item.color);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    handle({
      id: item.id!,
      data: { name, color },
      method: "PUT",
      onCompleted: (data) => {
        updateResources(data);
        dialogRef.current?.close();
      },
    }).catch((err) => {
      console.error(err);
    });
  };

  const handleDelete = () => {
    confirmDelete(
      () =>
        new Promise((resolve) => {
          handle({
            id: item.id!,
            method: "DELETE",
            onCompleted: (id) => {
              deleteResource(id!);
              resolve();
            },
          }).catch((err) => {
            console.error(err);
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
                  <Button disabled={isLoading} variant="primary" type="submit">
                    {isLoading ? "Update..." : "Save Changes"}
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
