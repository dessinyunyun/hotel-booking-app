import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { facilities } from '../hotelSchema/facilities';
import { purchase_order_header } from './purchase_order_header';
import { stocks } from './stocks';

export interface stock_detailAttributes {
  stod_stock_id: number;
  stod_id?: number;
  stod_barcode_number?: string;
  stod_status?: string;
  stod_notes?: string;
  stod_faci_id?: number;
  stod_pohe_id?: number;
}

@Table({ tableName: 'stock_detail', schema: 'purchasing', timestamps: false })
export class stock_detail
  extends Model<stock_detailAttributes, stock_detailAttributes>
  implements stock_detailAttributes
{
  @ForeignKey(() => stocks)
  @Column({ primaryKey: true, type: DataType.INTEGER })
  @Index({ name: 'pk_stod_stock_id', using: 'btree', unique: true })
  stod_stock_id!: number;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('purchasing.stock_detail_stod_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'pk_stod_stock_id', using: 'btree', unique: true })
  stod_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'un_stod_barcode_number', using: 'btree', unique: true })
  stod_barcode_number?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  stod_status?: string;

  @Column({ allowNull: true, type: DataType.STRING(1024) })
  stod_notes?: string;

  @ForeignKey(() => facilities)
  @Column({ allowNull: true, type: DataType.INTEGER })
  stod_faci_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  stod_pohe_id?: number;

  @BelongsTo(() => facilities)
  facility?: facilities;

  @HasMany(() => purchase_order_header, { sourceKey: 'stod_pohe_id' })
  purchase_order_headers?: purchase_order_header[];

  @BelongsTo(() => stocks)
  stock?: stocks;
}
