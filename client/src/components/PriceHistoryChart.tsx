import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { PriceHistory } from "@shared/schema";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useToast } from "@/hooks/use-toast";

interface PriceHistoryChartProps {
  productId: number;
}

interface FormattedPriceHistory {
  date: string;
  price: number;
}

const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ productId }) => {
  const { toast } = useToast();
  const [alertActive, setAlertActive] = useState(false);

  // Fetch price history data for the product
  const { data: priceHistory, isLoading } = useQuery<PriceHistory[]>({
    queryKey: [`/api/products/${productId}/price-history`],
  });

  const handlePriceAlert = () => {
    setAlertActive(!alertActive);
    
    toast({
      title: alertActive 
        ? "Price drop alert removed" 
        : "Price drop alert set",
      description: alertActive 
        ? "You will no longer receive alerts for this product" 
        : "You will be notified when the price drops",
      duration: 3000,
    });
  };

  // Format data for the chart
  const formattedData: FormattedPriceHistory[] = priceHistory?.map(item => ({
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    price: Number(item.price),
  })) || [];

  if (isLoading || !priceHistory || priceHistory.length === 0) {
    return (
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-neutral-dark">Price History (30 days)</h3>
          <Button 
            variant="ghost" 
            className="text-primary text-sm hover:text-primary hover:bg-pink-50"
            onClick={handlePriceAlert}
          >
            <Bell className={`mr-1 h-4 w-4 ${alertActive ? 'fill-current' : ''}`} />
            {alertActive ? 'Alert Active' : 'Get Price Drop Alert'}
          </Button>
        </div>
        <div className="w-full h-48 flex items-center justify-center">
          <p className="text-gray-500">Loading price history data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mb-6 bg-gray-50 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium text-neutral-dark">Price History (30 days)</h3>
        <Button 
          variant="ghost" 
          className="text-primary text-sm hover:text-primary hover:bg-pink-50"
          onClick={handlePriceAlert}
        >
          <Bell className={`mr-1 h-4 w-4 ${alertActive ? 'fill-current' : ''}`} />
          {alertActive ? 'Alert Active' : 'Get Price Drop Alert'}
        </Button>
      </div>
      <div className="w-full h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={formattedData}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 12 }} 
              tickMargin={10}
              stroke="#9CA3AF"
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tickFormatter={(value) => value}
              minTickGap={15}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickMargin={10} 
              stroke="#9CA3AF"
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              tickFormatter={(value) => `₹${value}`}
              domain={['dataMin - 100', 'dataMax + 100']}
            />
            <Tooltip
              formatter={(value) => [`₹${value}`, 'Price']}
              labelFormatter={(label) => `Date: ${label}`}
              contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}
            />
            <Line 
              type="monotone" 
              dataKey="price" 
              stroke="#F43F5E" 
              activeDot={{ r: 6 }} 
              strokeWidth={2}
              dot={{ r: 0 }}
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-in-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceHistoryChart;
