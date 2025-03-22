const mongoose = require("mongoose");
const Role = require("./models/role");
require("dotenv").config();
require("./database"); // Ensure database connection is properly initialized

const seedRoles = async () => {
    try {
        const predefinedRoles = [
            // 🔹 SYSTEM-WIDE ROLES
            {
                name: "super_admin",
                permissions: [
                    "create_business",
                    "view_business",
                    "manage_all",
                    "manage_users",
                    "manage_roles",
                    "manage_businesses",
                    "manage_modules",
                    "view_reports",
                    "manage_subscriptions",
                    "manage_logistics",
                    "manage_payments",
                    "approve_requests",
                    "send_notifications",
                    "view_audit_logs",
                    "manage_settings"
                ],
                createdBy: null
            },
            {
                name: "business_admin",
                permissions: [
                    "manage_users",
                    "assign_roles",
                    "manage_orders",
                    "manage_inventory",
                    "manage_finances",
                    "view_reports",
                    "handle_customer_queries"
                ],
                createdBy: null
            },
            {
                name: "user",
                permissions: ["view_dashboard"],
                createdBy: null
            },

            // 🔹 MANUFACTURERS (Factories, Pharma, Automotive, Food Processing)
            {
                name: "manufacturer_admin",
                permissions: [
                    "manage_all",
                    "manage_production",
                    "manage_inventory",
                    "manage_quality_control",
                    "view_production_reports",
                    "handle_wholesale_orders",
                    "manage_supply_chain",
                    "manage_raw_materials"
                ],
                createdBy: null
            },
            {
                name: "production_manager",
                permissions: ["oversee_production", "schedule_workers", "quality_check"],
                createdBy: null
            },
            {
                name: "warehouse_manager",
                permissions: ["manage_inventory", "track_shipments", "stock_management"],
                createdBy: null
            },

            // 🔹 WHOLESALERS (Distributors, Importers, Exporters, B2B Suppliers)
            // 🔹example endpoints : GET  business/shipment/report -- permission required : "get_reports"
            // 🔹example endpoints : POST business/shipment/report --  permission required : "create_reports"
            {
                name: "wholesale_admin",
                permissions: [
                    "manage_all",
                    "manage_bulk_orders",
                    "assign_sales_reps",
                    "set_pricing",
                    "manage_distributors",
                    "view_sales_reports",
                    "handle_logistics"
                ],
                createdBy: null
            },
            {
                name: "sales_manager",
                permissions: ["handle_bulk_orders", "negotiate_deals", "assign_sales_targets", "view_sales_reports"],
                createdBy: null
            },
            {
                name: "logistics_coordinator",
                permissions: ["track_shipments", "assign_transport", "handle_customs_clearance",],
                createdBy: null
            },

            // 🔹 RETAILERS (E-commerce, Supermarkets, Brick & Mortar)
            {
                name: "retail_admin",
                permissions: [
                    "manage_all",
                    "manage_store",
                    "set_product_pricing",
                    "oversee_customer_service",
                    "manage_orders",
                    "process_returns",
                    "view_sales_analytics"
                ],
                createdBy: null
            },
            {
                name: "store_manager",
                permissions: ["oversee_store_operations", "assign_staff_roles", "track_sales"],
                createdBy: null
            },
            {
                name: "cashier",
                permissions: ["process_payments", "handle_refunds", "apply_discounts"],
                createdBy: null
            },
            {
                name: "customer_support",
                permissions: ["handle_customer_queries", "process_returns", "resolve_complaints"],
                createdBy: null
            },

            // 🔹 LOGISTICS & TRANSPORTATION (Fleet, Delivery, Warehousing)
            {
                name: "logistics_manager",
                permissions: [
                    "assign_drivers",
                    "track_deliveries",
                    "manage_fleet",
                    "update_delivery_status",
                    "view_logs"
                ],
                createdBy: null
            },
            {
                name: "delivery_driver",
                permissions: ["view_assigned_orders", "update_delivery_status"],
                createdBy: null
            },

            // 🔹 FINANCE & PAYMENTS
            {
                name: "finance_manager",
                permissions: [
                    "manage_expenses",
                    "handle_invoices",
                    "track_payments",
                    "approve_refunds",
                    "view_financial_reports"
                ],
                createdBy: null
            },
            {
                name: "accountant",
                permissions: ["track_transactions", "generate_financial_reports"],
                createdBy: null
            },

            // 🔹 CONSUMERS (End-Users)
            {
                name: "consumer",
                permissions: ["place_orders", "write_reviews", "track_orders", "request_refunds"],
                createdBy: null
            }
        ];

        for (const role of predefinedRoles) {
            const exists = await Role.findOne({ name: role.name });
            if (!exists) {
                await Role.create(role);
                console.log(`✅ Role '${role.name}' added to database.`);
            } else {
                console.log(`⚠️ Role '${role.name}' already exists. Skipping.`);
            }
        }

        console.log("✅ Role seeding complete!");
        process.exit(); // Exit the script after execution
    } catch (error) {
        console.error("❌ Error seeding roles:", error);
        process.exit(1);
    }
};

// Run the script
seedRoles();
