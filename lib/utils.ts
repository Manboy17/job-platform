import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import qs from "query-string";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface FormSearchUrlQueryProps {
  params: string;
  key: string;
  value: string | null;
}

export function formSearchUrlQuery({
  params,
  key,
  value,
}: FormSearchUrlQueryProps) {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}

interface FormUrlQueryProps {
  params: string;
  filters: { [key: string]: string[] | null };
}

export function formUrlQuery({ params, filters }: FormUrlQueryProps) {
  const currentUrl = qs.parse(params);

  const updatedFilters = { ...currentUrl, ...filters };

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: updatedFilters,
    },
    { skipNull: true }
  );
}

interface RemoveUrlQueryParams {
  params: string;
  keysToRemove: string[];
}

export function removeUrlQuery({ params, keysToRemove }: RemoveUrlQueryParams) {
  const currentUrl = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
