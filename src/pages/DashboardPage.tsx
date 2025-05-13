import React, { useEffect } from 'react';
import { MessageSquare, Mail, Clock, AlertCircle, CheckCircle, Users } from 'lucide-react';
import MainLayout from '../components/layout/MainLayout';
import Card, { CardBody, CardHeader, CardFooter } from '../components/ui/Card';
import Button from '../components/ui/Button';
import useRuleStore from '../store/ruleStore';
import useHistoryStore from '../store/historyStore';
import useNotificationStore from '../store/notificationStore';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  const { rules, fetchRules } = useRuleStore();
  const { replyHistory, fetchHistory } = useHistoryStore();
  const { notifications, fetchNotifications } = useNotificationStore();
  
  useEffect(() => {
    fetchRules();
    fetchHistory();
    fetchNotifications();
  }, [fetchRules, fetchHistory, fetchNotifications]);
  
  const activeRules = rules.filter(rule => rule.active).length;
  const totalResponses = replyHistory.length;
  const successfulResponses = replyHistory.filter(history => history.successful).length;
  
  // Demo data for the dashboard
  const stats = [
    {
      name: 'Active Rules',
      value: activeRules,
      icon: <MessageSquare className="h-6 w-6 text-primary" />,
      change: '+2',
      trend: 'increase',
      link: '/rules'
    },
    {
      name: 'Emails Processed',
      value: 120,
      icon: <Mail className="h-6 w-6 text-secondary" />,
      change: '+12%',
      trend: 'increase',
      link: '/history'
    },
    {
      name: 'Auto-Replies Sent',
      value: totalResponses,
      icon: <CheckCircle className="h-6 w-6 text-success" />,
      change: '+8',
      trend: 'increase',
      link: '/history'
    },
    {
      name: 'Time Saved',
      value: '4.5 hrs',
      icon: <Clock className="h-6 w-6 text-accent" />,
      change: '+30min',
      trend: 'increase',
      link: '/analytics'
    },
  ];
  
  const senderTypeDistribution = [
    { type: 'Clients', count: 45, color: 'primary' },
    { type: 'Friends', count: 30, color: 'success' },
    { type: 'Family', count: 15, color: 'warning' },
    { type: 'Unknown', count: 30, color: 'error' },
  ];
  
  const total = senderTypeDistribution.reduce((acc, item) => acc + item.count, 0);
  
  return (
    <MainLayout requireAuth>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-1">Dashboard</h1>
        <p className="text-text-secondary">
          Overview of your auto-reply activity
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-card-hover transition-shadow">
            <CardBody className="flex items-center">
              <div className="mr-4 rounded-lg p-3 bg-gray-100">
                {stat.icon}
              </div>
              <div>
                <p className="text-text-secondary text-sm">{stat.name}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
                {stat.change && (
                  <p className={`text-xs ${stat.trend === 'increase' ? 'text-success' : 'text-error'}`}>
                    {stat.change} from last week
                  </p>
                )}
              </div>
            </CardBody>
            <CardFooter className="py-2 flex justify-end">
              <Link 
                to={stat.link} 
                className="text-xs text-primary font-medium hover:underline"
              >
                View details
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="font-semibold">Recent Auto-Replies</h2>
            <Link 
              to="/history" 
              className="text-xs text-primary font-medium hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {replyHistory.slice(0, 3).map((historyItem) => (
                <div key={historyItem.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between mb-1">
                    <p className="font-medium truncate max-w-[250px]">
                      {historyItem.replyContent.slice(0, 40)}...
                    </p>
                    <span className={`text-xs font-medium ${historyItem.successful ? 'text-success' : 'text-error'}`}>
                      {historyItem.successful ? 'Sent' : 'Failed'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {new Date(historyItem.sentAt).toLocaleString()}
                  </p>
                </div>
              ))}
              {replyHistory.length === 0 && (
                <div className="py-8 text-center text-text-secondary">
                  <Mail className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                  <p>No auto-replies sent yet</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="font-semibold">Email Sender Types</h2>
            <Link 
              to="/analytics" 
              className="text-xs text-primary font-medium hover:underline"
            >
              View analytics
            </Link>
          </CardHeader>
          <CardBody>
            <div className="flex items-center mb-6">
              <div className="w-20 h-20 rounded-full border-8 border-primary relative mr-6 flex items-center justify-center">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="space-y-4 flex-1">
                {senderTypeDistribution.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{item.type}</span>
                      <span className="font-medium">{Math.round((item.count / total) * 100)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`bg-${item.color} h-2 rounded-full`}
                        style={{ width: `${(item.count / total) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex justify-between items-center">
            <h2 className="font-semibold">Your Rules</h2>
            <Link to="/rules">
              <Button size="sm">
                Manage Rules
              </Button>
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {rules.map((rule) => (
                <div key={rule.id} className="p-4 hover:bg-gray-50">
                  <div className="flex justify-between mb-1">
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full ${rule.active ? 'bg-success' : 'bg-gray-300'} mr-2`}></div>
                      <p className="font-medium">{rule.name}</p>
                    </div>
                    <span className="text-xs bg-gray-100 py-1 px-2 rounded-full">
                      {rule.conditions.length} {rule.conditions.length === 1 ? 'condition' : 'conditions'}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary ml-4">
                    Action: <span className="capitalize">{rule.action.type}</span>
                    {rule.action.tone && ` • Tone: ${rule.action.tone}`}
                  </p>
                </div>
              ))}
              {rules.length === 0 && (
                <div className="py-8 text-center text-text-secondary">
                  <MessageSquare className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                  <p>No rules created yet</p>
                  <Link to="/rules/new" className="mt-2 inline-block">
                    <Button size="sm" variant="secondary">
                      Create Your First Rule
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
        
        <Card>
          <CardHeader className="flex justify-between items-center">
            <h2 className="font-semibold">Notifications</h2>
            <Link 
              to="/notifications" 
              className="text-xs text-primary font-medium hover:underline"
            >
              View all
            </Link>
          </CardHeader>
          <CardBody className="p-0">
            <div className="divide-y divide-gray-200">
              {notifications.slice(0, 5).map((notification) => (
                <div key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-primary/5' : ''}`}>
                  <div className="flex">
                    <div className="mr-3 mt-1">
                      {notification.type === 'reply_sent' && (
                        <CheckCircle className="h-5 w-5 text-success" />
                      )}
                      {notification.type === 'rule_matched' && (
                        <MessageSquare className="h-5 w-5 text-primary" />
                      )}
                      {notification.type === 'error' && (
                        <AlertCircle className="h-5 w-5 text-error" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-text-secondary">{notification.message}</p>
                      <p className="text-xs text-text-tertiary mt-1">
                        {new Date(notification.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
              {notifications.length === 0 && (
                <div className="py-8 text-center text-text-secondary">
                  <Bell className="h-10 w-10 mx-auto text-gray-300 mb-2" />
                  <p>No notifications yet</p>
                </div>
              )}
            </div>
          </CardBody>
        </Card>
      </div>
    </MainLayout>
  );
};

export default DashboardPage;