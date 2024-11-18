import styles from "./styles.module.css";
import { AiOutlineCheckCircle, AiOutlineClockCircle } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";

const STATUS = (status: string) => {
  switch (status) {
    case "EM_ESPERA":
      return <AiOutlineClockCircle />;
    case "PRONTO":
      return <AiOutlineCheckCircle />;
    case "ERROR":
      return <MdReportProblem />;
    case "PREPARANDO":
      return <MdReportProblem />;
    case "A_CONSTRUIR":
      return <AiOutlineClockCircle />;
    case "FALTAM_DADOS":
      return <MdReportProblem />;
    default:
      return <MdReportProblem />;
  }
};

export const NodeStatus: React.FC<{ status: string }> = ({ status }) => {
  return (
    <div className={styles.status} data-status={status}>
      <span className={styles.value}>{STATUS(status)}</span>
    </div>
  );
};
