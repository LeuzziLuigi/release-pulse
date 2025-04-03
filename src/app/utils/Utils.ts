export class Utils {   
    static getCookieValue(name: string): string | undefined {
        const b: RegExpMatchArray | null = document.cookie.match('(^|;)\\s*' + name + '\\s*=\\s*([^;]+)');
        return b ? b.pop() : '';
    }
}