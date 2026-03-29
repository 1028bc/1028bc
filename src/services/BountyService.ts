export interface BountyEntry {
    id: string; client: string; task: string; status: 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'PAID'; amount: number; date: string;
  }
  
  export const BountyService = {
    async getLatestBounties(): Promise<BountyEntry[]> {
      return [
        { id: '001', client: 'Starbucks', task: 'Node 04 Hardware Swap', status: 'ACTIVE', amount: 150, date: '2026-03-26' },
        { id: '002', client: 'tscircuit', task: 'PR #690 - Trace Optimization', status: 'PENDING', amount: 250, date: '2026-03-25' },
        { id: '003', client: 'AutoKey', task: 'KDE Wayland Support', status: 'PENDING', amount: 400, date: '2026-03-23' }
      ];
    },
    calculateTotal(bounties: BountyEntry[]): number {
      return bounties.reduce((acc, curr) => acc + curr.amount, 0);
    }
  };