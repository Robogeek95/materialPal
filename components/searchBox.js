import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React from "react";
import { useForm } from "react-hook-form";
import { Box, Grid, IconButton, Input } from "theme-ui";

const SearchBox = () => {
  const router = useRouter();
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    router.push(`/materials?q=${data.query}`, undefined, { shallow: true });
  };

  return (
    <Grid
      columns={"1fr auto"}
      as="form"
      onSubmit={(e) => e.preventDefault()}
      sx={{
        alignItems: "center",
        background: "white",
        height: "50px",
        border: "1px solid",
        borderColor: "#E5E5E5",
        width: "100%",
        borderRadius: "4px",
        px: "18px",
        bg: "gray200",
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        placeholder="Search Materials..."
        sx={{
          px: 10,
          bg: "inherit",
          height: "100%",
          "&:focus, &:active": {
            outline: "none",
            border: "0px",
          },
        }}
        type="text"
        name="query"
        ref={register({})}
      />

      <Box>
        <IconButton
          sx={{ cursor: "pointer" }}
          aria-label="Search Icon"
          color="lighter"
        >
          <FontAwesomeIcon size="lg" icon={faSearch} />
        </IconButton>
      </Box>
    </Grid>
  );
};

export default SearchBox;
