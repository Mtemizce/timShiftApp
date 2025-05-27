// ✅ backend/models/Personnel.js

import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Personnel = sequelize.define(
  "Personnel",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    registry: DataTypes.INTEGER, // Şirket Sicil No
    name: DataTypes.STRING,
    tc_no: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    birth_date: DataTypes.DATEONLY,
    hasDisability: DataTypes.STRING, // engelli durumu (evet/hayır)
    militaryStatus: DataTypes.STRING, // askerlik durumu (yaptı/yapmadı/muaf/tecilli)
    address: DataTypes.TEXT,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    marital_status: DataTypes.STRING,
    criminal_record: DataTypes.STRING,
    children_count: DataTypes.INTEGER,
    driving_license: DataTypes.STRING,
    education_level: DataTypes.STRING,
    iban: DataTypes.STRING,
    department: DataTypes.STRING,
    certificates: DataTypes.TEXT,
    size_pants: DataTypes.STRING,
    size_tshirt: DataTypes.STRING,
    size_coat: DataTypes.STRING,
    size_shoes: DataTypes.STRING,
    start_date: DataTypes.DATEONLY,
    end_date: DataTypes.DATEONLY, // işten çıkış tarihi
    role: DataTypes.STRING,
    image_file: DataTypes.STRING,
  },
  {
    tableName: "personnels",
    timestamps: true,
  }
);

export default Personnel;
