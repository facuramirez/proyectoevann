export const getPassengers = (form, usersBusiness) => {
  let data = [];
  for (let key in form) {
    switch (key) {
      case "persona1":
        if (form[key] && form[key] !== "-") {
          data = [
            ...data,
            {
              traveler: usersBusiness.find((user) => user.rut === form[key]).id,
              in_origin: form.aborda1,
              origin: !form.aborda1 ? form.dir1.label : null,
              origin_id: !form.aborda1 ? form.dir1.id : null,
            },
          ];
        }
        break;
      case "persona2":
        if (form[key] && form[key] !== "-") {
          data = [
            ...data,
            {
              traveler: usersBusiness.find((user) => user.rut === form[key]).id,
              in_origin: form.aborda2,
              origin: !form.aborda2 ? form.dir2.label : null,
              origin_id: !form.aborda2 ? form.dir2.id : null,
            },
          ];
          break;
        }
      case "persona3":
        if (form[key] && form[key] !== "-") {
          data = [
            ...data,
            {
              traveler: usersBusiness.find((user) => user.rut === form[key]).id,
              in_origin: form.aborda3,
              origin: !form.aborda3 ? form.dir3.label : null,
              origin_id: !form.aborda3 ? form.dir3.id : null,
            },
          ];
          break;
        }
      case "persona4":
        if (form[key] && form[key] !== "-") {
          data = [
            ...data,
            {
              traveler: usersBusiness.find((user) => user.rut === form[key]).id,
              in_origin: form.aborda4,
              origin: !form.aborda4 ? form.dir4.label : null,
              origin_id: !form.aborda4 ? form.dir4.id : null,
            },
          ];
          break;
        }
      default:
        break;
    }
  }

  return data;
};
