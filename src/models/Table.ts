import { pgdb } from '../dbConnect';
import { DataTypes } from 'sequelize';

export interface TableInterface {
  _id: number;
  number: number;
  seats: number;
  createdAt: string;
  createdBy: string;
}

// tslint:disable-next-line: variable-name
export const Table = pgdb.define(
  'table',
  {
    // Model attributes are defined here
    _id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    number: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    seats: {
      allowNull: false,
      type: DataTypes.INTEGER
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
