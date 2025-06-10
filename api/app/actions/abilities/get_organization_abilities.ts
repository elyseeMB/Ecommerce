import Roles from '../../enums/roles.js'

type Params = {
  roleId: number
}

export type OrganizationAbilities = {
  edit: boolean
  destroy: boolean
  manageUsers: boolean
}

export default class GetOrganizationAbilities {
  static handle({ roleId }: Params): OrganizationAbilities {
    return {
      edit: this.canEdit(roleId),
      destroy: this.destroy(roleId),
      manageUsers: this.canManageUsers(roleId),
    }
  }

  static canEdit(roleId: Params['roleId']): boolean {
    return roleId === Roles.ADMIN
  }

  static destroy(roleId: Params['roleId']): boolean {
    return roleId === Roles.ADMIN
  }

  static canManageUsers(roleId: Params['roleId']): boolean {
    return roleId === Roles.ADMIN
  }
}
