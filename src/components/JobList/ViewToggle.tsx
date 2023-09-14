import { Toggle } from "../ui/toggle";
import { WidthIcon } from "@radix-ui/react-icons";
import { useListTypeStore } from "@/store/listTypeSlice";

export default function ViewToggle() {
  const setListType = useListTypeStore((state) => state.setListType);
  const listType = useListTypeStore((state) => state.listType);

  return (
    <Toggle
      aria-pressed={listType}
      onClick={() => setListType(!listType)}
      variant="default"
      aria-label="Toggle Grid Row"
      className="gap-2 border"
    >
      {listType ? (
        <div className="flex space-x-2">
          <WidthIcon className="w-4 h-4 transform transition-all rotate-180" />
          <span>Grid</span>
        </div>
      ) : (
        <div className="flex space-x-2">
          <WidthIcon className="w-4 h-4 transform transition-all rotate-90" />
          <span>Row</span>
        </div>
      )}
    </Toggle>
  );
}
