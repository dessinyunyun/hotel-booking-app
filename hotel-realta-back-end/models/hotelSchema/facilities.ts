import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface facilitiesAttributes {
  faci_id?: number;
  faci_name?: string;
  faci_description?: string;
  faci_max_number?: number;
  faci_measure_unit?: string;
  faci_room_number?: string;
  faci_startdate?: string;
  faci_enddate?: string;
  faci_low_price?: string;
  faci_high_price?: string;
  faci_rate_price?: string;
  faci_discount?: string;
  faci_tax_rate?: string;
  faci_cagro_id?: number;
  faci_hotel_id?: number;
  faci_modified_date?: Date;
  faci_expose_price?: string;
}

@Table({ tableName: 'facilities', schema: 'hotel', timestamps: false })
export class facilities
  extends Model<facilitiesAttributes, facilitiesAttributes>
  implements facilitiesAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('hotel.facilities_faci_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'facilities_pkey', using: 'btree', unique: true })
  @Index({ name: 'pk_faci_id', using: 'btree', unique: true })
  faci_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(125) })
  faci_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  faci_description?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_max_number?: number;

  @Column({ allowNull: true, type: DataType.STRING(15) })
  faci_measure_unit?: string;

  @Column({ allowNull: true, type: DataType.STRING(6) })
  @Index({
    name: 'facilities_faci_room_number_key',
    using: 'btree',
    unique: true,
  })
  faci_room_number?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  faci_startdate?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  faci_enddate?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_low_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_high_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_rate_price?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_discount?: string;

  @Column({ allowNull: true, type: DataType.NUMBER })
  faci_tax_rate?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_cagro_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  faci_hotel_id?: number;

  @Column({
    allowNull: true,
    type: DataType.DATE(6),
    defaultValue: Sequelize.literal('now()'),
  })
  faci_modified_date?: Date;

  @Column({
    allowNull: true,
    type: DataType.STRING(20),
    defaultValue: Sequelize.literal("'Rate Price'::character varying"),
  })
  faci_expose_price?: string;
}
