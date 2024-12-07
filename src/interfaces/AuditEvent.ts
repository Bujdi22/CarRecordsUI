export interface AuditEvent {
    updated_field: string,
    event_happened_on: string,
    old_value: any,
    new_value: any,
}