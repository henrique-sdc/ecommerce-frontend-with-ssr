import { LoaderCircle } from "lucide-react";

export default function AdminLoading() {
    return (
        <div className = "flex justify-center">
            <LoaderCircle className="size-24 animate-spin"/>
    </div>
    )
}