import { handleErrorSync, options } from "@stlib/utils";
import path from "path";
import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'recepies.db'),
  logging: Boolean(options?.log).valueOf(),
});

export const connectDb = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true, force: false });
  } catch (e) {
    handleErrorSync(e, { throw: true });
  }
}
