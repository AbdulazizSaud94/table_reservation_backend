import { pgdb } from '../dbConnect';
import { DataTypes } from 'sequelize';

export interface UserInterface {
  _id: number;
  employeeNumber: string;
  name: string;
  role: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deleted: boolean;
}

// tslint:disable-next-line: variable-name
export const User = pgdb.define(
  'user',
  {
    // Model attributes are defined here
    _id: {
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      type: DataTypes.INTEGER
    },
    employeeNumber: {
      allowNull: false,
      unique: true,
      type: DataTypes.INTEGER
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
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
