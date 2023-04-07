import { Observable } from "rxjs";


export interface IRepository<T> {

    findAll(): Observable<T[]>;

    create(entity: T): Observable<T | null>;

    update(id: string, entity: T): Observable<T>;

    delete(id: string): Observable<boolean>;

    findById(id: string): Observable<T>;

}