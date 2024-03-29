import { enqueueSnackbar, VariantType } from "notistack";

export default function PopupAlert(text: string, variant: VariantType) {
    enqueueSnackbar(text, {
        variant,
        autoHideDuration: 2000,
        style: {
            width: "150px",
        },
    });
}
