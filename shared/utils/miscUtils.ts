export default class Utils {
  static ensureDynamicContent = (rowTemplate: Object) => {
    const newRow = { ...rowTemplate };
    if (Date.now() % 2) {
      Object.keys(newRow).forEach((key) => {
        let value = (newRow as any)[key];
        if (typeof value !== "string") return;
        (newRow as any)[key] = this.replaceWithTestContent(value);
      });
    }
    return newRow;
  };

  static replaceWithTestContent = (value: string, replaceWith = "test") => {
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
