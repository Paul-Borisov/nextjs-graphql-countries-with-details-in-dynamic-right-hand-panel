import IGraphQLQueryFilter from "../types/iGraphQLQueryFilter";

export default class Utils {
  // Not in use, an example of using type guards
  static ensureDynamicContent = <
    T extends Record<string, string | number | boolean>
  >(
    rowTemplate: T
  ) => {
    const newRow = { ...rowTemplate };
    if (Date.now() % 2) {
      Object.keys(newRow).forEach((key) => {
        let value = newRow[key as keyof T];
        newRow[key as keyof T] = this.replaceWithTestContent(
          value?.toString()
        ) as T[keyof T];
      });
    }
    return newRow;
  };

  static getQueryFilter = (filter?: IGraphQLQueryFilter) => {
    return filter
      ? `(filter: ${JSON.stringify(filter)
          .replace(/"/g, "")
          .replace(/'/g, '"')})`
      : "";
  };

  static replaceWithTestContent = (value: string, replaceWith = "test") => {
    if (!value) return value;

    const textContent = [...replaceWith];

    let index = 0;
    let output: string[] = [];
    value.split("").forEach((v) => {
      if (index === textContent.length) index = 0;

      if (v.toLocaleLowerCase() === v.toLocaleUpperCase()) {
        // Not a letter
        output.push(
          !isNaN(Number(v)) && v !== " "
            ? Math.ceil(Math.random() * 9).toString()
            : v
        );
      } else {
        if (v === v.toLocaleUpperCase()) {
          // An uppercase letter
          output.push(textContent[index].toLocaleUpperCase());
        } else {
          // A lowercase letter
          output.push(textContent[index].toLocaleLowerCase());
        }
        index++;
      }
    });

    return output.join("");
  };
}
