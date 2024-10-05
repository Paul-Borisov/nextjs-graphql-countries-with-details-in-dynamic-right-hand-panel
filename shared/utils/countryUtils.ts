export default class CountryUtils {
  static tryGetCountryNameByCountryCode = async (countryCode: string) => {
    const defaultUrl = "https://restcountries.com/v3.1/alpha/{countryCode}";
    try {
      const endpoint = (
        process.env.endpointCountryByCode || defaultUrl
      ).replace(/\/\{.+/, `/${countryCode}`);
      const country = await fetch(endpoint).then((request) => request.json());
      if (Array.isArray(country) && country.length && country[0].name?.common) {
        return country[0].name?.common as string;
      }
    } catch (e) {
      console.log(e);
    }
  };
}
