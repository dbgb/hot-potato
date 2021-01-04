import { useEffect } from "react";

export default function useLogOnChange(obj) {
  useEffect(() => {
    console.log(obj);
  }, [obj]);
}
