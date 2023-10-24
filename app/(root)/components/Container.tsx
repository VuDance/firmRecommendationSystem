"use client";

import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Firm } from "@prisma/client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

interface ContainerProps {
  listFirm: {
    firm: Firm[];
  };
}

const Container: React.FC<ContainerProps> = ({ listFirm }) => {
  const [name, setName] = React.useState("");
  const [listRecommended, setListRecommended] = useState<any[]>();
  const [id, setId] = useState(-1);
  const handleChange = (event: SelectChangeEvent) => {
    setName(event.target.value as string);
    setId(event.target.value as unknown as number);
  };
  const getRecommendedFirm = async (id: number) => {
    const res = await fetch(
      `http://localhost:3000/api/firm/getRecommendFirm?id=${id}`
    );
    const data = await res.json();
    setListRecommended(data.data);
  };
  useEffect(() => {
    getRecommendedFirm(id);
  }, [id]);
  return (
    <div>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Name</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={name}
          label="Age"
          onChange={handleChange}
        >
          {listFirm.firm.length > 0 &&
            listFirm.firm.map((firm) => (
              <MenuItem key={firm.id} value={firm.id}>
                {firm.Name}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
      <div className="flex gap-3 mt-3 justify-center items-center">
        {listRecommended &&
          listRecommended?.length > 0 &&
          listRecommended.map((recommended) => (
            <div key={recommended.Name}>
              <Image
                width={200}
                height={300}
                className=" !h-[300px]"
                src={recommended.image}
                alt=""
              />
              <p>{recommended.Name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Container;
