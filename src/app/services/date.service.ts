import { Injectable, LOCALE_ID } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DateService {

    MY_LOCALE = 'pt-BR';
    constructor(private datePipe: DatePipe) { }

    transform(date: any, format?: string): string {
        return <string>this.datePipe.transform(date, format || 'dd/MM/yyyy HH:mm:ss', this.MY_LOCALE);
    }

}