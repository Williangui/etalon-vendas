import { Pipe, PipeTransform } from '@angular/core';
import {DateService} from "../services/date.service";

@Pipe({ name: 'customDate' })
export class CustomDatePipe implements PipeTransform {

    constructor(private dateService: DateService) {}

    transform(date: any, format?: string): string {
        return this.dateService.transform(date, format);
    }

}