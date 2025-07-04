import { motion } from 'framer-motion';
import Card from '@/components/atoms/Card';

const Loading = ({ type = 'table' }) => {
  if (type === 'table') {
    return (
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
              <tr>
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <th key={i} className="px-6 py-3">
                    <div className="h-3 bg-slate-200 rounded shimmer"></div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {[1, 2, 3, 4, 5].map((i) => (
                <tr key={i}>
                  {[1, 2, 3, 4, 5, 6].map((j) => (
                    <td key={j} className="px-6 py-4">
                      <div className="h-4 bg-slate-200 rounded shimmer"></div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  if (type === 'cards') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <div className="space-y-3">
              <div className="h-4 bg-slate-200 rounded shimmer"></div>
              <div className="h-8 bg-slate-200 rounded shimmer"></div>
              <div className="h-3 bg-slate-200 rounded shimmer w-2/3"></div>
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-64">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default Loading;