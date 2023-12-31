import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { purchase_order_header } from './purchase_order_header';

export interface vendorAttributes {
  vendor_entity_id?: number;
  vendor_name?: string;
  vendor_active?: string;
  vendor_priority?: string;
  vendor_register_date?: Date;
  vendor_weburl?: string;
  vendor_modified_date?: Date;
}

@Table({ tableName: 'vendor', schema: 'purchasing', timestamps: false })
export class vendor
  extends Model<vendorAttributes, vendorAttributes>
  implements vendorAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.vendor_vendor_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_vendor_entity_id', using: 'btree', unique: true })
  vendor_entity_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(55) })
  vendor_name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  vendor_active?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  vendor_priority?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  vendor_register_date?: Date;

  @Column({ allowNull: true, type: DataType.STRING(1024) })
  vendor_weburl?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  vendor_modified_date?: Date;

  @HasMany(() => purchase_order_header, { sourceKey: 'vendor_entity_id' })
  purchase_order_headers?: purchase_order_header[];
}
