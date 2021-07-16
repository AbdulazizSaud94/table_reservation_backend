import { pgdb } from '../dbConnect';
import { DataTypes } from 'sequelize';

export interface ReservationInterface {
  _id: number;
  tablerNumber: number;
  customers: number;
  from: number;
  to: number;
  createdAt: string;
  createdBy: string;
}

// tslint:disable-next-line: variable-name
export const Reservation = pgdb.define(
  'reservation',
  {
    // Model attributes are defined here
    _id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    customers: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
    from: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    to: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    timestamps: false // Other model options go here
  }
);
