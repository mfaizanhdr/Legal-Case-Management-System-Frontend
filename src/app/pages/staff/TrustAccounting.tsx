import { Card, CardHeader, CardContent } from "../../components/Card";
import { Badge } from "../../components/Badge";
import { Button } from "../../components/Button";
import { DollarSign, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function TrustAccounting() {
  const trustAccounts = [
    { client: "Fatima Zahra", matter: "Zahra v. Khan Logistics", balance: "Rs. 10,000", lastActivity: "2026-04-15" },
    { client: "Tariq Mehmood", matter: "Estate of Tariq Mehmood", balance: "Rs. 25,000", lastActivity: "2026-04-10" },
    { client: "TechCorp Pakistan Ltd.", matter: "Contract Review", balance: "Rs. 15,000", lastActivity: "2026-04-12" },
  ];

  const recentTransactions = [
    { date: "2026-04-17", type: "Deposit", client: "Fatima Zahra", amount: "Rs. 5,000", balance: "Rs. 10,000" },
    { date: "2026-04-15", type: "Withdrawal", client: "Sana Sheikh", amount: "Rs. 3,500", balance: "Rs. 5,000" },
    { date: "2026-04-12", type: "Deposit", client: "TechCorp Pakistan Ltd.", amount: "Rs. 15,000", balance: "Rs. 15,000" },
    { date: "2026-04-10", type: "Transfer", client: "Tariq Mehmood", amount: "Rs. 2,000", balance: "Rs. 25,000" },
  ];

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Trust Accounting</h1>
          <p className="text-gray-600 mt-1">Manage client trust accounts</p>
        </div>
        <Button>New Transaction</Button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Trust Balance</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. 50,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active Accounts</p>
                <p className="text-2xl font-semibold text-gray-900">12</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">MTD Transfers</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. 35,000</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Trust Account Balances */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Trust Account Balances</h3>
          </CardHeader>
          <CardContent className="p-0">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Client</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Matter</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-600 uppercase">Balance</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {trustAccounts.map((account, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{account.client}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{account.matter}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900 text-right">{account.balance}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{account.lastActivity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-gray-200">
              {recentTransactions.map((txn, i) => (
                <div key={i} className="px-6 py-4 hover:bg-gray-50">
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      txn.type === "Deposit" ? "bg-green-100" : "bg-orange-100"
                    }`}>
                      {txn.type === "Deposit" ? (
                        <ArrowDownRight className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowUpRight className="w-4 h-4 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">{txn.type}</p>
                        <p className="text-sm font-medium text-gray-900">{txn.amount}</p>
                      </div>
                      <p className="text-sm text-gray-600">{txn.client}</p>
                      <div className="flex items-center justify-between mt-1">
                        <p className="text-xs text-gray-500">{txn.date}</p>
                        <p className="text-xs text-gray-500">Balance: {txn.balance}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
