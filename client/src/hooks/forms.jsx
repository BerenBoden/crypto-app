import { useEffect, useRef, useCallback } from "react";
import { useWatch } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useGetCryptoBySymbolQuery } from "../store/services/crypto/cryptoService";

export function useFormDisabler(isLoading) {
  const formRef = useRef(null);

  useEffect(() => {
    if (formRef.current) {
      const formControls = formRef.current.querySelectorAll(
        "input, button, select, textarea"
      );
      formControls.forEach((control) => {
        control.disabled = isLoading;
      });
    }
  }, [isLoading]);

  return formRef;
}

export function useWatchSelect({ control, name, dispatchFunction }) {
  let selectedOption = useWatch({
    control,
    name,
  });
  const dispatch = useDispatch();
  const { data: crypto, isLoading } = useGetCryptoBySymbolQuery(
    { symbol: selectedOption },
    {
      refetchOnMountOrArgChange: true,
      skip: !selectedOption,
      watch: selectedOption,
    }
  );

  const dispatchFunctionCallback = useCallback(dispatchFunction, []);

  useEffect(() => {
    if (isLoading) {
      return;
    }
    // when user presses backspace to the start of input (selectedOption will be null), the value is then set to 0
    if (name === "amount" && !selectedOption) {
      selectedOption = 0;
      dispatch(dispatchFunctionCallback(selectedOption));
      return;
    }
    if (name === "symbol") {
      dispatch(
        dispatchFunctionCallback({
          symbol: selectedOption,
          name: crypto.name,
          price: crypto.price,
          link: crypto.link,
        })
      );
      return;
    }
    if (selectedOption) {
      dispatch(dispatchFunctionCallback(selectedOption));
    }
  }, [isLoading, selectedOption, name, crypto, dispatchFunctionCallback]);
}
