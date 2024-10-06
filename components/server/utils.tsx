import "server-only";

import Link from "next/link";
import Utils from "@/shared/utils/miscUtils";

const formatLinkUrl = (value: string, returnUrl: string) => {
  return `${returnUrl}${returnUrl.endsWith("/") ? "" : "/"}${value}`;
};
const formatTableView = (
  results: JSX.Element[],
  key: string,
  value: string,
  uniqueKey: string,
  returnUrl: string
) => {
  if (key === "code") {
    results.push(
      <li key={uniqueKey}>
        <Link
          className="underline font-semibold text-blue-500 hover:text-blue-700 dark:hover:text-white"
          href={formatLinkUrl(value, returnUrl)}
        >
          {value}
        </Link>
      </li>
    );
  } else {
    results.push(<li key={uniqueKey}>{value}</li>);
  }
};

const formatKeyValueView = (
  results: JSX.Element[],
  key: string,
  value: string,
  uniqueKey: string
) => {
  results.push(
    <li key={uniqueKey} className="grid grid-cols-2">
      <div className="font-semibold capitalize">{key}</div>
      <div>{value}</div>
    </li>
  );
};

export const formatData = (
  data?: unknown,
  keyValue: boolean = false,
  addTestRow: boolean = false,
  returnUrl: string = "/"
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
  const templateRow: Record<string, string | number | boolean> = {};
  const rowClass = keyValue ? "grid gap-3" : "grid grid-cols-5 gap-5 pb-5";

  data.data.countries.forEach((country, index) => {
    if (!("capital" in country && country.capital)) return;
    const countryColumnValues: JSX.Element[] = [];
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

        const uniqueKey = key + index;
        if (keyValue) {
          formatKeyValueView(countryColumnValues, key, country[key], uniqueKey);
        } else {
          formatTableView(
            countryColumnValues,
            key,
            country[key],
            uniqueKey,
            returnUrl
          );
        }
        if (index === 0) templateRow[key] = country[key];
      });
    results.push(
      <ol className={rowClass} key={country["code"] ?? `countryrow-${index}`}>
        {countryColumnValues}
      </ol>
    );
  });

  if (addTestRow) {
    const testRow: JSX.Element[] = [];
    Object.keys(templateRow).forEach((key) => {
      const testValue = Utils.replaceWithTestContent(
        templateRow[key]?.toString()
      );
      const uniqueKey = key + "-1";
      if (keyValue) {
        formatKeyValueView(testRow, key, testValue, uniqueKey);
      } else {
        formatTableView(testRow, key, testValue, uniqueKey, returnUrl);
      }
    });
    results.unshift(
      <ol className={rowClass} key={"testrow-0"}>
        {testRow}
      </ol>
    );
  }

  if (!keyValue) {
    results.unshift(
      <ol className={rowClass} key={"kv-0"}>
        {Array.from(headers).map((header) => (
          <li className="font-semibold capitalize" key={header + "-2"}>
            {header}
          </li>
        ))}
      </ol>
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
