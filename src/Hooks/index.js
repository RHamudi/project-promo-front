import { Toast } from "react-native-alert-notification"

export const Notifications = (titleMsg ,type, text, typeButton) => {
    toastConfig = {
        type: type,
        title: titleMsg,
        textBody: text,
    }
    if(typeButton) {
        toastConfig.button = typeButton
    }
    console.log("Teste")
    Toast.show(toastConfig)
}