import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from './db';

export interface RecepieType
  extends Model<InferCreationAttributes<RecepieType>, InferAttributes<RecepieType>> {
  id: string;
  name: string;
  ingridients: string;
  steps: string;
  notes?: string;
}

export const RecepieEntity = sequelize.define<RecepieType>(
  'Recepie',
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ingridients: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    steps: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    notes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'recepies',
    timestamps: false,
  },
);
