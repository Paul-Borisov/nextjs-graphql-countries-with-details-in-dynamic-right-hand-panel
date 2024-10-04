import Utils from "@/shared/utils/miscUtils";
import Link from "next/link";

const formatTableView = (
  results: JSX.Element[],
  key: string,
  value: string
) => {
  if (key === "code") {
    results.push(
      <li>
        <Link
          className="underline font-semibold text-blue-500"
          href={`/${value}`}
        >
          {value}
        </Link>
      </li>
    );
  } else {
    results.push(<li>{value}</li>);
  }
};

const formatKeyValueView = (
  results: JSX.Element[],
  key: string,
  value: string
) => {
  results.push(
    <li className="grid grid-cols-2">
      <div className="font-semibold capitalize">{key}</div>
      <div>{value}</div>
    </li>
  );
};

export const formatData = (
  data?: unknown,
  keyValue: boolean = false,
  addTestRow: boolean = false
) => {
  // type guarding
  if (!(data && data instanceof Object)) return null;
  if (!("data" in data)) return null;
  if (
    !(
      data.data instanceof Object &&
      "countries" in data.data &&
      Array.isArray(data.data.countries)
    )
  ) {
    return null;
  }

  const headers = new Set<string>();
  const results: JSX.Element[] = [];
  const templateRow: any = {};
  data.data.countries.forEach((country, index) => {
    if (!("capital" in country && country.capital)) return;
    Object.keys(country)
      .sort()
      .forEach((key) => {
        if (
          key?.startsWith("__") ||
          country[key] instanceof Object ||
          typeof country[key] === "undefined"
        ) {
          return;
        }

        if (!headers.has(key)) headers.add(key);

        if (keyValue) {
          formatKeyValueView(results, key, country[key]);
        } else {
          formatTableView(results, key, country[key]);
        }
        if (index === 0) templateRow[key] = country[key];
      });
  });

  if (addTestRow) {
    const testRow: JSX.Element[] = [];
    Object.keys(templateRow).forEach((key) => {
      const testValue = Utils.replaceWithTestContent(templateRow[key]);
      if (keyValue) {
        formatKeyValueView(testRow, key, testValue);
      } else {
        formatTableView(testRow, key, testValue);
      }
    });
    results.unshift(...testRow);
  }

  if (!keyValue) {
    results.unshift(
      ...Array.from(headers).map((header) => (
        <li className="font-semibold capitalize" key={header}>
          {header}
        </li>
      ))
    );
  }

  return results;
};

export const findFirstCountryName = (data?: unknown) => {
  // type guarding
  if (!(data && data instanceof Object)) return null;
  if (!("data" in data)) return null;
  if (
    !(
      data.data instanceof Object &&
      "countries" in data.data &&
      Array.isArray(data.data.countries) &&
      data.data.countries.length > 0
    )
  ) {
    return null;
  }
  const country = data.data.countries[0];
  if (
    !(
      "states" in country &&
      Array.isArray(country.states) &&
      country.states.length > 0
    )
  ) {
    return null;
  }

  return country.states[0].country?.name;
};
