import { BaseModel } from '../core/base.model'

export interface AdminModel extends BaseModel {
  username: string
  fullname: string
  password: string
}
