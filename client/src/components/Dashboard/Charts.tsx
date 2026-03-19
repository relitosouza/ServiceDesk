import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface WeeklyData {
  name: string;
  count: number;
}

interface StatusData {
  name: string;
  value: number;
}

export const TicketBarChart = ({ data }: { data: WeeklyData[] }) => (
  <div className="h-64 w-full">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} 
          dy={10}
        />
        <YAxis hide />
        <Tooltip 
          cursor={{ fill: '#f1f5f9' }}
          contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
        />
        <Bar dataKey="count" fill="#135bec" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

const COLORS = ['#f59e0b', '#135bec', '#10b981'];

export const TicketPieChart = ({ data }: { data: StatusData[] }) => (
  <div className="h-64 w-full relative flex items-center justify-center">
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
    <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
      <p className="text-2xl font-black text-slate-900 dark:text-white leading-none">
        {data.reduce((acc, curr) => acc + curr.value, 0)}
      </p>
      <p className="text-[10px] font-bold uppercase text-slate-400 tracking-tighter">Total</p>
    </div>
  </div>
);
