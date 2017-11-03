export class PendingEntityManager {
  private static idCount = 0;
  private static pendingIds: { [key: string]: true | string } = {};

  public static getTempId(): string {
    const id = PendingEntityManager.generateId();
    PendingEntityManager.pendingIds[id] = true;
    return id;
  }

  public static getRealId(tempid: string): string | null {
    const realId = PendingEntityManager.pendingIds[tempid];
    return typeof realId === 'string' ? realId : null;
  }

  public static resolveTempId(tempid: string, realId: string): void {
    if (PendingEntityManager.pendingIds[tempid] !== true) {
      throw new EvalError('Each temp id may only be resolved once');
    }
    PendingEntityManager.pendingIds[tempid] = realId;
  }

  private static generateId(): string {
    ++PendingEntityManager.idCount;
    return `temp-${PendingEntityManager.idCount}`;
  }
}