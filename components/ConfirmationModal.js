import { Button } from "./Button";
import { Modal } from "./Modal";
const ConfirmationModal = ({
  title,
  subtitle,
  confirmText = "confirm",
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal onBackgroundClick={() => onCancel?.()}>
      <div className="flex flex-col justify-center items-center gap-3 bg-white p-10 rounded-sm">
        <div className="text-lg font-bold">{title}</div>
        <div className="text-gray-800">{subtitle}</div>
        <div className="flex w-full gap-3">
          <Button
            className="flex-1"
            variant="outline"
            onClick={() => onCancel?.()}
          >
            Cancel
          </Button>
          <Button onClick={() => onConfirm?.()} className="flex-1">
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

ConfirmationModal.Title = ({ title }) => {
  return <p className="text-lg font-bold">{title}</p>;
};

ConfirmationModal.Subtitle = () => {};

export { ConfirmationModal };
