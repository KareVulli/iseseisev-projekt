export class Alert {
    
    
    static showMessage(message) {
        $('#status').removeClass('alert-danger');
        $('#status').addClass('alert-dark');
        $('#status').text(message);
        this.showAlert();
    }

    static showError(message) {
        $('#status').removeClass('alert-dark');
        $('#status').addClass('alert-danger');
        $('#status').text(message);
        this.showAlert();
    }

    static clearTimeout() {
        if (Alert.hideTimeout != null) {
            clearTimeout(Alert.hideTimeout);
        }
    }

    static createHideTimeout() {
        Alert.hideTimeout = setTimeout(() => this.hideAlert(), 4000);
    }

    static showAlert() {
        this.clearTimeout();
        $('#status').slideDown(200);
        this.createHideTimeout();
    }

    static hideAlert() {
        this.hideTimeout = null;
        $('#status').slideUp(200);
    }

}
Alert.hideTimeout = null;