"use client";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import ImageUpload from "./ImageUpload";
import TextField from "@mui/material/TextField";

type AllowedValues =
  | "image"
  | "name"
  | "action"
  | "horror"
  | "cartoon"
  | "romantic"
  | "adventure"
  | "sci_fi"
  | "superhero";

const arrGenres = [
  "action",
  "horror",
  "cartoon",
  "romantic",
  "adventure",
  "sci_fi",
  "superhero",
];

const Form = () => {
  const methods = useForm({
    values: {
      image: "",
      name: "",
      action: 0,
      horror: 0,
      cartoon: 0,
      romantic: 0,
      adventure: 0,
      sci_fi: 0,
      superhero: 0,
      rating: 0,
    },
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: AllowedValues = (event.target as HTMLInputElement)
      .value as AllowedValues;

    methods.setValue(`${value}`, checked(value));
  };

  const checked = (value: AllowedValues) => {
    const data = methods.getValues(value);
    if (data == 1) {
      return 0;
    } else {
      return 1;
    }
  };
  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:3000/api/firm/addFirm", {
        method: "POST",
        body: JSON.stringify(data),
        mode: "cors",
      });
      const mess = await res.json();
      console.log(mess);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <FormProvider {...methods}>
      <form className="flex gap-3" onSubmit={methods.handleSubmit(onSubmit)}>
        <ImageUpload />

        <div>
          <div>
            <p>Tên phim</p>
            <TextField
              size="small"
              onChange={(e) => methods.setValue("name", e.target.value)}
            />
          </div>
          <div>
            <p>Điểm đánh giá</p>
            <TextField
              size="small"
              type="number"
              inputProps={{
                maxLength: 1,
                step: "0.1",
              }}
              onChange={(e) =>
                methods.setValue("rating", parseFloat(e.target.value))
              }
            />
          </div>
          <div>
            {arrGenres.map((item: any) => (
              <div key={item} className="flex gap-2">
                <input type="radio" value={item} onChange={handleChange} />
                <p>{item}</p>
              </div>
            ))}
          </div>
          <input type="submit" />
        </div>
      </form>
    </FormProvider>
  );
};

export default Form;
