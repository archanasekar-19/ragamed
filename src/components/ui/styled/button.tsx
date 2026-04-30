import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import clsx from "clsx";

type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

interface CustomButtonProps extends MuiButtonProps {
    variantType?: Variant;
    sizeType?: Size;
}

const StyledButton = styled(MuiButton, {
    shouldForwardProp: (prop) => prop !== "variantType" && prop !== "sizeType",
})<CustomButtonProps>(({ theme, variantType, sizeType }) => {
    const base = {
        borderRadius: 8,
        textTransform: "none",
        fontWeight: 500,
        transition: "all 0.2s ease",
        boxShadow: "none",
    };

    const variants = {
        default: {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.primary.dark,
            },
        },
        destructive: {
            backgroundColor: theme.palette.error.main,
            color: "#fff",
            "&:hover": {
                backgroundColor: theme.palette.error.dark,
            },
        },
        outline: {
            border: `1px solid ${theme.palette.divider}`,
            color: theme.palette.text.primary,
            backgroundColor: "transparent",
            "&:hover": {
                backgroundColor: theme.palette.action.hover,
            },
        },
        secondary: {
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.secondary.contrastText,
            "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
            },
        },
        ghost: {
            backgroundColor: "transparent",
            color: theme.palette.text.primary,
            "&:hover": {
                backgroundColor: theme.palette.action.hover,
            },
        },
        link: {
            backgroundColor: "transparent",
            color: theme.palette.primary.main,
            textDecoration: "underline",
            "&:hover": {
                backgroundColor: "transparent",
                textDecoration: "underline",
            },
        },
    };

    const sizes = {
        default: {
            height: 36,
            padding: "0 16px",
        },
        sm: {
            height: 32,
            padding: "0 12px",
            fontSize: "0.8rem",
        },
        lg: {
            height: 42,
            padding: "0 24px",
            fontSize: "1rem",
        },
        icon: {
            height: 36,
            width: 36,
            minWidth: 36,
            padding: 0,
        },
    };

    return {
        ...base,
        ...(variants[variantType || "default"]),
        ...(sizes[sizeType || "default"]),
    };
});

export function Button({
    className,
    variantType = "default",
    sizeType = "default",
    ...props
}: CustomButtonProps) {
    return (
        <StyledButton
            className={clsx(className)}
            variant="contained"
            variantType={variantType}
            sizeType={sizeType}
            {...props}
        />
    );
}