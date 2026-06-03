import { type Metadata } from 'next'
import { SimpleLayout } from '@/components/SimpleLayout'

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Marc Runkel — IT executive with 30+ years of experience.',
}

function ResumeSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
      <div className="grid max-w-3xl grid-cols-1 items-baseline gap-y-4 md:grid-cols-4">
        <h2 className="text-sm font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h2>
        <div className="md:col-span-3">{children}</div>
      </div>
    </div>
  )
}

function RoleEntry({
  title,
  company,
  dates,
  intro,
  children,
}: {
  title: string
  company: string
  dates: string
  intro?: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-10">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
        <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
          {title}
        </h3>
        <span className="text-sm text-zinc-500 dark:text-zinc-400 sm:shrink-0">
          {dates}
        </span>
      </div>
      <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
        {company}
      </p>
      {intro && (
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{intro}</p>
      )}
      <div className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {children}
      </div>
    </div>
  )
}

const bulletListClass = 'mt-2 list-disc space-y-1 pl-5'
const subBulletListClass = 'mt-1 list-disc space-y-1 pl-5'

export default function ResumePage() {
  return (
    <SimpleLayout
      title="Resume"
      intro="I am an accomplished IT executive with over 30 years of experience in a wide range of information technology disciplines."
    >
      <div className="space-y-12">

        {/* Contact */}
        <ResumeSection title="Contact">
          <div className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <p className="font-semibold text-zinc-800 dark:text-zinc-100">
              Marc Runkel &mdash; IT Executive
            </p>
            <p className="italic">Solve any problem</p>
            <p>
              <a
                href="mailto:marc@runkel.org"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                marc@runkel.org
              </a>
            </p>
            <p>
              <a
                href="https://www.runkel.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                runkel.org
              </a>
            </p>
            <p>
              <a
                href="https://linkedin.com/in/marcrunkel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                linkedin.com/in/marcrunkel
              </a>
            </p>
            <p>
              <a
                href="https://github.com/mrunkel"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400"
              >
                github.com/mrunkel
              </a>
            </p>
          </div>
        </ResumeSection>

        {/* Career Profile */}
        <ResumeSection title="Career Profile">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            I am an accomplished IT executive with over 30 years of experience in a wide range of information technology disciplines:
          </p>
          <ul className={bulletListClass}>
            <li>
              Architected, coded, and deployed a large variety of systems (applications, networks, and data centers) for performance and reliability with great success both on-premises or increasingly in &ldquo;the cloud&rdquo;
            </li>
            <li>An outstanding hands on manager and mentor</li>
            <li>A polyglot developer</li>
            <li>Extensive experience with both Scrum and Waterfall software development life cycles</li>
            <li>Performed DevOps before it had a name</li>
            <li>Extensive general project management skills</li>
            <li>Thorough understanding of networking technology in the modern Internet (including security and redundancy)</li>
            <li>In-depth understanding and experience with virtualization systems from the desktop to multi-server elastic systems</li>
            <li>As a remote employee who managed geographically dispersed teams, am well versed in the challenges and benefits that remote work provides</li>
          </ul>
        </ResumeSection>

        {/* Experience */}
        <ResumeSection title="Experience">
          <div>

            {/* CTO — plusForta */}
            <RoleEntry
              title="CTO"
              company="plusForta, GmbH &mdash; Düsseldorf, Germany"
              dates="2017 – Present"
              intro="Was brought in to improve the development process for their online insurance sales systems"
            >
              <ul className={bulletListClass}>
                <li>Provided leadership in all areas to ensure the implementation of best practices</li>
                <li>Migrated front-end platforms from a hodge-podge of technologies to a single solution based on Kirby CMS, React, and VueJS</li>
                <li>Introduced Scrum methodology to the company</li>
                <li>Set up full automated code deployment system</li>
                <li>Set up a continuous integration server for automated testing</li>
                <li>Instituted Puppet configuration management for central control and replicability</li>
                <li>Wrote puppet manifests for system configuration which were adopted by all technical teams in the company</li>
                <li>Used puppet, database replication, and snapshots to provide automated, nearly instant disaster recovery with Amazon Web Services</li>
                <li>For monitoring and analysis, installed LibreNMS and ELK</li>
                <li>Migrated hosting environment from a mix of providers to digital ocean</li>
              </ul>
            </RoleEntry>

            {/* VP Technical Operations — Untangle */}
            <RoleEntry
              title="VP of Technical Operations"
              company="Untangle &mdash; San Jose, California &amp; Düsseldorf, Germany"
              dates="2008 – 2016"
              intro="Managed the Technical Operations group which encompassed various disciplines, including IT, website/e-commerce development, customer support, and product management. My role was to manage the overall team and to get my hands dirty when necessary. Company grew from 13 people to over 80."
            >
              <ul className={bulletListClass}>
                <li>
                  IT Department
                  <ul className={subBulletListClass}>
                    <li>International Support with offices in 6 locations spanning 18 time zones</li>
                    <li>
                      Created a Helpdesk to service internal customer needs
                      <ul className={subBulletListClass}>
                        <li>Supported Linux, Windows, and OS X desktops and servers</li>
                      </ul>
                    </li>
                    <li>24/7 on-call support for production system</li>
                    <li>Developed a home-grown Asterisk/FreePBX based telephony solution to connect all employees globally</li>
                  </ul>
                </li>
                <li>
                  Website/E-Commerce
                  <ul className={subBulletListClass}>
                    <li>Initially built e-commerce and subscription management system</li>
                    <li>Migrated backend subscription system with zero downtime and no negative customer impact</li>
                    <li>
                      Later managed a geographically dispersed team of 7 (5 Developers, 2 QA)
                      <ul className={subBulletListClass}>
                        <li>Provided guidance and initial architecture and wrote code when necessary</li>
                      </ul>
                    </li>
                    <li>Introduced Scrum methodology to the company</li>
                    <li>Set up full automated code deployment system</li>
                    <li>Set up a continuous integration server for automated testing</li>
                    <li>Instituted a formal code review process</li>
                    <li>Introduced JIRA to the company, hosted and managed system for all internal development teams</li>
                    <li>Provided full support for two e-commerce websites that generated over 20 million dollars annually</li>
                  </ul>
                </li>
                <li>
                  Datacenter Management
                  <ul className={subBulletListClass}>
                    <li>
                      Transformed six traditional data centers with over 250 physical servers into a VMWare based virtual environment.
                      <ul className={subBulletListClass}>
                        <li>Resulted in 120 Virtual Machines total in 9 ESXi Hosts in two geographically dispersed datacenters with zero reduction in performance or capability</li>
                        <li>Total data center costs went from $75,000/mo to $9,000/mo</li>
                      </ul>
                    </li>
                    <li>Instituted Puppet configuration management for central control and replicability</li>
                    <li>Wrote puppet manifests for system configuration which were adopted by all technical teams in the company</li>
                    <li>Replaced aging Cisco routing infrastructure with VyOS and off-the-shelf Dell servers running BGP and OSPF</li>
                    <li>Deployed database replication and snapshots to improve performance and reliability</li>
                    <li>Used puppet, database replication, and snapshots to provide automated, nearly instant disaster recovery with Amazon Web Services</li>
                    <li>For monitoring and analysis, replaced expensive SolarWinds installation with open source LibreNMS, integrated with puppet to provide automatic configuration of new systems on deployment</li>
                  </ul>
                </li>
                <li>
                  Customer Support
                  <ul className={subBulletListClass}>
                    <li>Provided 3rd tier escalation support</li>
                    <li>Instituted the use of Zendesk across the company for external and internal customer support</li>
                    <li>Mentored staff on technical issues and strategies for dealing with customers</li>
                    <li>Provided regular training on technical topics related to network design and management</li>
                  </ul>
                </li>
                <li>
                  Product Management
                  <ul className={subBulletListClass}>
                    <li>Provided domain expertise for our next generation firewall product</li>
                    <li>Spearheaded the enormously successful relaunch of our appliance line</li>
                  </ul>
                </li>
              </ul>
            </RoleEntry>

            {/* Senior IT Engineer — Skyriver/Total IT */}
            <RoleEntry
              title="Senior IT Engineer"
              company="Skyriver/Total IT &mdash; San Diego, CA"
              dates="2004 – 2008"
              intro="Founded an IT consulting startup inside an existing ISP business. I provided &ldquo;virtual-CTO&rdquo; type services to local businesses, managed day to day operation of the practice, and performed nationwide site-surveys and design of Hospitality WiFi systems."
            >
              <ul className={bulletListClass}>
                <li>Created procedures and policies for new group</li>
                <li>Selected, installed, and configured helpdesk software</li>
                <li>Provided day to day supervision and support for 4 field techs</li>
                <li>Redesigned and re-implemented WiFi hotspot product for Hospitality customers</li>
                <li>Provided 3rd level tech support for ISP network</li>
                <li>Managed IT operations at major client with over 40 servers and 85 users worldwide</li>
                <li>Managed roll-out of 200 user Exchange server</li>
                <li>Performed external security audits</li>
                <li>Performed IT audits including review of processes and technologies</li>
                <li>Designed and oversaw installation of over $1.2MM worth of WiFi installations in hotels and office buildings</li>
                <li>Designed, built, and managed several office moves, data center rollouts, and migrations</li>
                <li>Deployed VoIP systems for several clients including our own office</li>
              </ul>
            </RoleEntry>

            {/* NYPD 911 — IXP */}
            <RoleEntry
              title="Public Safety Answer Center (NYPD 911) Technical Manager"
              company="IXP &mdash; New York, NY"
              dates="2003 – 2004"
              intro="Managed a team of 5 providing 24/7 2nd level technical support to the New York Police Department (NYPD) 911 public safety answering center (PSAC) for all of New York City which handles 30,000 incoming calls and 10,000 radio dispatches per day."
            >
              <ul className={bulletListClass}>
                <li>
                  Responsible for the continuous operation (99.999%) of the NYPD 911 system. This system spans two redundant facilities and includes:
                  <ul className={subBulletListClass}>
                    <li>210 call taking positions</li>
                    <li>116 radio dispatch positions</li>
                    <li>25 support systems</li>
                    <li>NICE digital and analog voice recording systems</li>
                    <li>SNA gateways</li>
                    <li>Mobile Data Terminals</li>
                    <li>Cisco &amp; Cabletron network infrastructure</li>
                  </ul>
                </li>
                <li>Systems supported are a mix of AIX, Windows 2000, and Windows 98</li>
                <li>Performed systems design and oversaw integration of NY Fire Department (FDNY) and Emergency Services (EMS) call taking and dispatch</li>
                <li>Implemented policies and procedures including: support contact procedures, document storage library, backup procedures, and Anti-virus protection and response procedures</li>
              </ul>
            </RoleEntry>

            {/* Director of IT — ClearCross */}
            <RoleEntry
              title="Director of IT"
              company="ClearCross &mdash; New York, NY"
              dates="1998 – 2002"
              intro="Hired as Director of IT as employee 35. Company grew into a 350 person company with offices in four countries."
            >
              <ul className={bulletListClass}>
                <li>Architected, engineered, implemented and supported an international network</li>
                <li>
                  Managed all aspects of network from desktop support to LAN/WAN
                  <ul className={subBulletListClass}>
                    <li>Staff of 12 in 9 locations (four countries) that included production, helpdesk, DBA, and LAN support members</li>
                  </ul>
                </li>
                <li>
                  Implemented policies and procedures for equipment and acceptable use of IT resources
                  <ul className={subBulletListClass}>
                    <li>LAN consisted of 55 Servers w/285 desktops and 210 laptops</li>
                    <li>Supported multi-platform environment including, NT, Solaris, and Linux Operating Systems</li>
                    <li>Managed a $2.8MM annual IT budget</li>
                  </ul>
                </li>
                <li>
                  Developed and implemented the following procedures:
                  <ul className={subBulletListClass}>
                    <li>Created a formal change control procedure to minimize service interruptions</li>
                    <li>Formal budgeting controls and approvals for equipment requests to control department expenditures</li>
                    <li>Standard desktop and laptop software installation procedures to speed up equipment deployment and reduce software licensing costs.</li>
                  </ul>
                </li>
                <li>
                  Implemented the following to improve communications and employee productivity:
                  <ul className={subBulletListClass}>
                    <li>Upgraded entire network to 10/100 Switched Ethernet for improved speed and reliability</li>
                    <li>Interconnected all remote sites with low-cost IPSEC VPNs for improved communications</li>
                    <li>Created internal website for multiple department&apos;s use</li>
                    <li>Converted company from cc:Mail &amp; Notes to Exchange</li>
                    <li>Installed 23 line dialup server, VPN server, and terminal server for remote employee access to network</li>
                    <li>Installed 120 tape, 6 drive jukebox to increase data backup reliability</li>
                  </ul>
                </li>
                <li>
                  Created multiple reports for business units including:
                  <ul className={subBulletListClass}>
                    <li>Created reports to access Goldmine database for weekly sales reporting including Sales pipeline, prospect status, and time utilization in Crystal Reports</li>
                    <li>Created real-time reports against our production database for use in billing, support, and analysis using ASP.</li>
                  </ul>
                </li>
                <li>
                  Designed, budgeted, implemented, and supported our company&apos;s 24x7 production data center.
                  <ul className={subBulletListClass}>
                    <li>Service provides real-time answers to complex regulatory, financial and logistical questions for customers such as Oracle, DHL, CDWorld, &amp; Fingerhut</li>
                    <li>Hardware Technology used includes: Cisco Local Directors, PIX Firewalls, Routers, and Switches and Compaq RA8000 Fibre Channel Array</li>
                    <li>Purchased, installed, and configured network monitoring package</li>
                    <li>Created various scripts to automate maintenance procedures</li>
                    <li>Built customer management web-site (internal &amp; external)</li>
                  </ul>
                </li>
              </ul>
            </RoleEntry>

            {/* Network Planner — Universal Studios */}
            <RoleEntry
              title="Network Planner"
              company="Universal Studios &mdash; Hollywood, CA"
              dates="1997 – 1998"
              intro="Hired as a contractor for a 6 month period. I opted not to renew my contract for the new opportunity in New York. Started in the network implementation team and was promoted to network planning within a month."
            >
              <ul className={bulletListClass}>
                <li>Designed network topology, specified equipment, created implementation plan, and managed installation of 175-location point of sale network throughout the amusement park. Technologies used include 100BaseFX, 10/100BaseT, Symbol Technologies wireless equipment, and Tut Ethernet Repeaters (pre-DSL spec DSL modems)</li>
                <li>Also involved in 3rd level tech support for entire 4,000 node international network consisting of a combination of Cisco &amp; Bay Networks equipment. Network Architecture included 622Mbps ATM full mesh backbone, 10/100 Ethernet to desktop and legacy Token Ring</li>
                <li>Used IBM NetView (OpenView) and remote sniffer equipment to diagnose and solve campus network issues</li>
              </ul>
            </RoleEntry>

            {/* Network Specialist — UMass */}
            <RoleEntry
              title="Network Specialist"
              company="University of Massachusetts &mdash; Amherst, MA"
              dates="1992 – 1997"
              intro="As the Network Specialist in the Registrar's office, I was responsible for the campus wide administrative network and the Registrar's office systems"
            >
              <ul className={bulletListClass}>
                <li>Managed IT staff in providing LAN/PC Hardware (Macintosh &amp; IBM PC) and application (MS Office, Exchange, Windows 95) support for end user community of 100+ customers in a dozen administrative and faculty offices on the University of Massachusetts, Amherst campus. Management responsibilities included: interviewing, hiring, &amp; firing as well as day to day supervision, specifying and justifying purchase orders, and working with outside vendors to coordinate systems maintenance and upgrades</li>
                <li>Designed and managed installation campus-wide administrative computing network providing file &amp; print, email, network fax, and remote access to 175 customers. Oversaw continued use of network and determined upgrade schedule and appropriate use guidelines. Network included 5 Novell File Servers, 3 Windows NT servers, a RAID storage sub-system, and a Linux system</li>
                <li>Spearheaded and designed plan to enable IPX routing across campus backbone to enable high speed interconnections of over 70 disparate Local Area Networks</li>
                <li>Installed, designed, and maintained office WWW Servers running on Apache on Linux and Netscape Enterprise Server on Windows NT</li>
                <li>Critical team member in design and implementation of a web-based application, providing real-time access to IBM 3090 mainframe based legacy data for 50,000+ students and employees across all University of Massachusetts campuses (<a href="https://goo.gl/9hMEDJ" target="_blank" rel="noopener noreferrer" className="text-teal-500 hover:text-teal-600 dark:hover:text-teal-400">WISE</a>). Front-end of system was implemented on a SUN SPARC 5 running Solaris 2.5 with Netscape&apos;s Commerce Server v1.2</li>
                <li>Maintained, programmed, and updated 64 line IVR Registration System providing real-time registration to over 20,000 students</li>
                <li>Redesigned and oversaw development of improved transcript imaging project. Project made extensive use of industry standard equipment and RAID level 5 storage systems</li>
                <li>Responsible for maintenance and administration of all office servers. Included kernel modifications, system optimizations, applying bug fixes, and developing applications as needed</li>
                <li>Primary programmer for all reporting and form generation for office. In addition to ad-hoc requests, used SAS programming language to create multiple programs, which pulled transactional data into reporting datasets and generated multiple reports on a regular basis, which generated over 80,000 mailings every semester</li>
              </ul>
            </RoleEntry>

            {/* IT Manager — The Progressive Group */}
            <RoleEntry
              title="IT Manager"
              company="The Progressive Group &mdash; Hadley, MA"
              dates="1990 – 1992"
              intro="Hired as a IT Assistant, promoted to Manager within four months."
            >
              <ul className={bulletListClass}>
                <li>Managed day-to-day information systems operations for hundreds of clients</li>
                <li>Developed and maintained mission critical custom pledge tracking system</li>
                <li>Supervised maintenance and improvement of a 30-station Novell network</li>
                <li>Created Crystal Reports to provide call statistics for daily reporting eventually re-wrote the reports in Clipper for increased speed and reliability</li>
              </ul>
            </RoleEntry>

            {/* Software Developer — Self Employed */}
            <RoleEntry
              title="Software Developer"
              company="Self Employed &mdash; Santa Clarita, CA"
              dates="1984 – 1988"
              intro="Work on misc. software development jobs as a high-school student."
            >
              <ul className={bulletListClass}>
                <li>Converted the computer system for a nationwide mail order business using an IBM PC and dBase III</li>
                <li>Built an inventory tracking system in dBase III for local manufacturing company</li>
              </ul>
            </RoleEntry>

          </div>
        </ResumeSection>

        {/* Education */}
        <ResumeSection title="Education">
          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400">
            <div>
              <p className="font-semibold text-zinc-800 dark:text-zinc-100">Computer Systems Analysis</p>
              <p>University of Massachusetts, Amherst</p>
              <p className="text-zinc-500 dark:text-zinc-500">1996 &ndash; 1997</p>
            </div>
            <div>
              <p className="font-semibold text-zinc-800 dark:text-zinc-100">Computer Science</p>
              <p>University of California, Irvine</p>
              <p className="text-zinc-500 dark:text-zinc-500">1986 &ndash; 1990</p>
            </div>
          </div>
        </ResumeSection>

        {/* Languages */}
        <ResumeSection title="Languages">
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>
              English{' '}
              <span className="text-zinc-500 dark:text-zinc-500">(Native)</span>
            </li>
            <li>
              German{' '}
              <span className="text-zinc-500 dark:text-zinc-500">(Fluent C2)</span>
            </li>
          </ul>
        </ResumeSection>

        {/* Interests */}
        <ResumeSection title="Interests">
          <ul className="text-sm text-zinc-600 dark:text-zinc-400 space-y-1">
            <li>Traveling</li>
            <li>Technology</li>
            <li>Cooking</li>
            <li>Learning</li>
          </ul>
        </ResumeSection>

      </div>
    </SimpleLayout>
  )
}
