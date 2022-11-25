import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";


export const useUiStore = () => {

const dispacth = useDispatch();

  const { isDateModalOpen } = useSelector( state => state.ui );

const openDateModal = () => {
    dispacth( onOpenDateModal() );
}
const closeDateModal = () => {
  dispacth( onCloseDateModal() );
}

return{
    // propiedades
    isDateModalOpen,
    // Métodos
    openDateModal,
    closeDateModal
}

}
