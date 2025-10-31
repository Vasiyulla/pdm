export function Footer() {
  return (
    <footer className="bg-sidebar border-t border-sidebar-border mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="font-semibold text-sidebar-foreground mb-4">AI/ML Predictive Maintenance</h3>
            <p className="text-sm text-muted-foreground">
              Advanced industrial equipment monitoring and failure prediction system.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-sidebar-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="/" className="hover:text-accent transition-colors">
                  Dashboard
                </a>
              </li>
              <li>
                <a href="/alerts" className="hover:text-accent transition-colors">
                  Alerts
                </a>
              </li>
              <li>
                <a href="/reports" className="hover:text-accent transition-colors">
                  Reports
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-sidebar-foreground mb-4">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Email: support@pmystem.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-sidebar-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            © 2025 AI/ML Predictive Maintenance System. Developed by Mullan Vasiyullah.
          </p>
        </div>
      </div>
    </footer>
  )
}
