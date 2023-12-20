import { Injectable } from '@angular/core';
import {
  Employee,
  EntityDetails,
  EntityListItem,
  EntityType,
  EntityUpdateDto,
  GetEntityListParams,
  LocationStats,
} from '../model/model';
import { Observable, defer, delay, of, throwError } from 'rxjs';

@Injectable()
export class MockEntityService {
  entities: EntityDetails[] = [
    {
      entityId: '1',
      trackingId: 'ab:cd:ef:5d:7a',
      name: 'Entity 1',
      entityType: 'n1t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '2',
      trackingId: 'ac:cd:ef:4d:7a',
      name: 'Entity 2',
      entityType: 'n1t',
      entityStatus: 'Break',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '3',
      trackingId: 'af:cd:ef:5d:8a',
      name: 'Entity 3',
      entityType: 'n2t',
      entityStatus: 'On Duty',
      isActive: true,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
    {
      entityId: '4',
      trackingId: 'af:cf:ef:5d:9a',
      name: 'Entity 4',
      entityType: 'n2t',
      entityStatus: 'Break',
      isActive: false,
      attributes: [
        'Department1',
        'Fast Responder',
        'xyakf83kfdasf930-fksdf0239-12303-46340129394',
        'Morning Shift',
      ],
    },
  ];

  entityTypes: EntityType[] = [
    { id: 'n1t', name: 'Nurse' },
    { id: 'n2t', name: 'Security' },
  ];

  lastWeekLocationOccupancy: number[] = [40, 245, 235, 182, 143, 120, 20];

  lastWeekVisitsLog: Employee[] = [
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id2', name: 'Charles Bradley' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id3', name: 'Mason Moore' },
    { id: 'id4', name: 'Alice Kelly' },
    { id: 'id5', name: 'Rachel Gray' },
    { id: 'id6', name: 'Alexis Morales' },
    { id: 'id1', name: 'Jacob Holland' },
    { id: 'id1', name: 'Jacob Holland' },
  ];

  getEntityList({
    search,
    name,
  }: GetEntityListParams): Observable<EntityListItem[]> {
    return defer(() => {
      if (Math.random() < 0.1)
        return throwError(() => 'Cannot retrieve the list');
      return of(
        (search
          ? this.entities.filter(
              (entity) =>
                entity.name.includes(search) ||
                entity.trackingId?.includes(search)
            )
          : name
          ? this.entities.filter((entity) => entity.name === name)
          : this.entities
        ).map((entity) => ({
          ...entity,
          entityType:
            this.entityTypes.find((t) => t.id === entity.entityType)?.name ??
            'Unknown type',
        }))
      );
    }).pipe(delay(1000));
  }

  getEntityDetails(entityId: string): Observable<EntityDetails> {
    const entity = this.entities.find((entity) => entity.entityId === entityId);
    return entity
      ? of(entity).pipe(delay(1000))
      : throwError(() => 'No entity found');
  }

  updateEntity(
    entityUpdateDto: EntityUpdateDto,
    entityId: string
  ): Observable<EntityDetails> {
    return defer(() => {
      if (Math.random() < 0.1) return throwError(() => 'Failed to update');
      const index = this.entities.findIndex((e) => e.entityId === entityId);
      if (index !== -1) {
        this.entities[index] = { ...this.entities[index], ...entityUpdateDto };
        return of(this.entities[index]);
      }
      return throwError(() => 'Entity not found');
    }).pipe(delay(1000));
  }

  getEntityTypes(): Observable<EntityType[]> {
    return of(this.entityTypes);
  }

  getLocationStats(): Observable<LocationStats> {
    return defer(() => {
      if (Math.random() < 0.1) return throwError(() => 'Failed to update');
      return of({
        lastWeekLocationOccupancy: this.lastWeekLocationOccupancy,
        lastWeekEmployeesVisits: this.mapVisits(),
      });
    }).pipe(delay(1000));
  }

  private mapVisits() {
    const count: { [key: string]: number } = {};
    this.lastWeekVisitsLog.forEach(
      (log) => (count[log.name] = (count[log.name] || 0) + 1)
    );
    const topCounts = Object.entries(count)
      .sort()
      .slice(0, 5)
      .map((log) => ({ name: log[0], visits: log[1] }));
    return topCounts;
  }
}
