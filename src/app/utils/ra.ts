import { Utils } from "./Utils";

export function mockExternalDependencies() {
    // this will repeat when browser session is ended
    const hasToken: string | undefined = Utils.getCookieValue('SCV');
    if (hasToken === 'true') {
        return;
    }
    const raAuthToken: string | null | undefined = prompt('Enter an RAAuthToken to proceed...');
    if (raAuthToken !== undefined && raAuthToken !== null) {
        localStorage.setItem('RAAuthToken', raAuthToken);
        localStorage.setItem('locale', 'en-US');
        document.cookie = 'SCV=true';

        return;
    }

    console.log('RAAuthToken was null.');
}