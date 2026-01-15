"use client";

import Link from "next/link";

import { CodeBlock } from "@/components/installation/CodeBlock";
import { ScrollProgressBar } from "@/components/installation/ScrollProgressBar";

const sections = [
  { id: "dhcp", label: "Master DHCP", number: 1 },
  { id: "requirements", label: "Requirements", number: 2 },
  { id: "master", label: "Master", number: 3 },
  { id: "slaves", label: "Slave(s)", number: 4 },
  { id: "final", label: "Final Run", number: 5 },
];

export default function InternalInstallationPage() {
  return (
    <>
      <ScrollProgressBar sections={sections} />
      <div className="min-h-screen">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="space-y-16">
            <section className="space-y-4">
              <h1 className="text-4xl font-semibold text-foreground sm:text-5xl">
                Internal installation
              </h1>
              <p className="text-base text-muted-foreground max-w-3xl">
                Dedicated 512rede fabric separated from the home LAN. The master routes and serves DHCP for the cluster.
                Follow the steps in order.
              </p>
            </section>

            <section id="dhcp" className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground uppercase tracking-[0.16em]">
                1. Setup master DHCP
              </h2>
              <p className="text-muted-foreground">
                Before installing anything, confirm the internal fabric is wired and the master is ready to act as the
                router and DHCP server for 512rede.
              </p>
              <p className="text-sm text-muted-foreground">
                Make sure your physical layout looks like the 512rede diagram.{" "}
                <Link href="/512rede" className="text-accent underline decoration-dotted underline-offset-4">
                  View the 512rede page
                </Link>
                .
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Confirm the fabric layout</h3>
                  <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-1">
                    <li>Master has two NICs: home LAN/WAN and 512rede</li>
                    <li>Switch connects only the 512rede nodes</li>
                    <li>Gateway is the master on 512rede</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Run setup1.sh and pick the correct NIC</h3>
                  <p className="text-sm text-muted-foreground">
                    setup1.sh will ask which interface should be renamed to 512rede. Run <code>ip a</code> first and
                    pick the interface that does not have an IP address and does not have internet access.
                  </p>
                  <CodeBlock
                    code={`sudo dnf update -y
sudo dnf install git -y

git clone https://github.com/Maruqes/HyperHive
cd HyperHive/scripts/main/master
sudo ./setup1.sh`}
                  />
                  <div className="space-y-3">
                    <p className="text-sm text-muted-foreground">
                      In the example below, <strong>ens3</strong> has an IP address and <strong>ens9</strong> has no IP.
                      Your interface names can differ. Choose the interface without an IP and without internet access.
                      That one becomes 512rede.
                    </p>
                    <div className="mx-auto w-full max-w-2xl overflow-hidden rounded-2xl border border-border/60 bg-black/20">
                      <img
                        src="/static/example_setup_dhcp.png"
                        alt="ip a output showing one interface with an IP and another without"
                        className="w-full max-h-72 object-contain"
                      />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    setup1.sh installs dependencies and performs a full reboot.
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Disable firewalld</h3>
                  <CodeBlock
                    code={`sudo systemctl stop firewalld
sudo systemctl disable firewalld`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Run setup_dhcp.sh</h3>
                  <CodeBlock
                    code={`cd HyperHive/scripts/master
sudo ./setup_dhcp.sh`}
                  />
                  <p className="text-sm text-muted-foreground">
                    After this, all slaves should receive DHCP leases in the 192.168.76.x range from the master.
                  </p>
                </div>
              </div>
            </section>

            <section id="requirements" className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground uppercase tracking-[0.16em]">
                2. Requirements
              </h2>
              <p className="text-muted-foreground">
                Run these commands on every server.
              </p>
              <p className="text-sm text-muted-foreground">
                All nodes should be connected to the 512rede switch by cable or an equivalent link that offers the same
                reliability and throughput as Ethernet.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Update system</h3>
                  <CodeBlock code="sudo dnf update -y" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Install Go</h3>
                  <CodeBlock code="sudo dnf install golang -y" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Install SSH server</h3>
                  <CodeBlock
                    code={`sudo dnf install -y openssh-server
sudo systemctl enable sshd
sudo systemctl start sshd`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Install Node.js and PM2</h3>
                  <CodeBlock
                    code={`sudo dnf install npm -y
sudo npm install -g pm2`}
                  />
                </div>
              </div>
            </section>

            <section id="master" className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground uppercase tracking-[0.16em]">
                3. Master
              </h2>
              <p className="text-muted-foreground">
                Run these steps on the master. The master also runs a local slave, so setup2.sh will ask for
                both MASTER and SLAVE .env values.
              </p>
              <p className="text-sm text-muted-foreground">
                Since setup1.sh was already completed in the DHCP step, continue with setup2.sh.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Run setup2.sh</h3>
                  <div className="rounded-lg border border-border/50 bg-[rgba(5,8,16,0.5)] p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Master setup2.sh fields (short)</p>
                    <ul className="mt-2 space-y-1">
                      <li><strong>MODE</strong> - prod or dev environment.</li>
                      <li><strong>QEMU_UID / QEMU_GID</strong> - user/group IDs for QEMU/libvirt.</li>
                      <li><strong>SPRITE_MIN_PORT / SPRITE_MAX_PORT</strong> - port range used by Sprite VMs.</li>
                      <li><strong>MASTER_INTERNET_IP</strong> - IP of the home LAN/internet-facing interface.</li>
                      <li>
                        <strong>MAIN_LINK</strong> - base URL for dashboard/API. For full features, use a domain like{" "}
                        <code>https://hyperhive.domain.com/api</code>. You can update the .env later.
                      </li>
                      <li><strong>GoAccess (optional)</strong> - enable/disable analytics panels.</li>
                      <li><strong>VAPID (optional)</strong> - web push keys.</li>
                    </ul>
                    <div className="mt-3 text-muted-foreground">
                      <p><strong>GoAccess keys:</strong> Get the GeoIP license key from MaxMind (GeoLite2). Use it for GEOIP_LICENSE_KEY / GEOIP_EDITION.</p>
                      <p><strong>VAPID keys:</strong> Generate with <code>npx web-push generate-vapid-keys</code> and paste the public/private keys. You can also find online generators by searching for &quot;VAPID key generator&quot;.</p>
                    </div>
                    <p className="mt-3 text-xs font-semibold text-red-400">
                      Careful with port ranges. Do not overlap them with other services or other nodes.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border/50 bg-[rgba(5,8,16,0.5)] p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Local slave setup2.sh fields (short)</p>
                    <ul className="mt-2 space-y-1">
                      <li><strong>MASTER_IP</strong> - master IP on 512rede.</li>
                      <li><strong>SLAVE_IP</strong> - same as MASTER_IP (local slave runs on the master).</li>
                      <li><strong>OTHER_SLAVE_IPS</strong> - other nodes (comma-separated, no self).</li>
                      <li><strong>DIRTY_RATIO_PERCENT</strong> - max dirty RAM before sync.</li>
                      <li><strong>DIRTY_BACKGROUND_RATIO_PERCENT</strong> - start background flush threshold.</li>
                      <li><strong>MODE</strong> - prod or dev environment.</li>
                      <li><strong>MACHINE_NAME</strong> - name for the local slave (e.g. master).</li>
                      <li><strong>VNC_MIN_PORT / VNC_MAX_PORT</strong> - VNC port range for the local slave.</li>
                      <li><strong>QEMU_UID / QEMU_GID</strong> - user/group IDs for QEMU/libvirt.</li>
                      <li><strong>EXTRA_K8S_IPS (optional)</strong> - extra IPs for Kubernetes integration.</li>
                    </ul>
                  </div>
                  <CodeBlock
                    code={`cd HyperHive/scripts/main/master
sudo ./setup2.sh`}
                  />
                  <CodeBlock
                    title="Example values (Master)"
                    code={`MODE=prod
QEMU_UID=107
QEMU_GID=107
SPRITE_MIN_PORT=9600
SPRITE_MAX_PORT=9700
MASTER_INTERNET_IP=192.168.76.128
MAIN_LINK=http://192.168.76.128:8079
GOACCESS_ENABLE_PANELS=
GOACCESS_DISABLE_PANELS=
GOACCESS_GEOIP_LICENSE_KEY=YOUR_MAXMIND_KEY
GOACCESS_GEOIP_EDITION=GeoLite2-City
VAPID_PUBLIC_KEY=YOUR_VAPID_PUBLIC
VAPID_PRIVATE_KEY=YOUR_VAPID_PRIVATE`}
                  />
                  <CodeBlock
                    title="Example values (Local Slave on Master)"
                    code={`MASTER_IP=192.168.76.128
SLAVE_IP=192.168.76.128
OTHER_SLAVE_IPS=192.168.76.78,192.168.76.114
DIRTY_RATIO_PERCENT=15
DIRTY_BACKGROUND_RATIO_PERCENT=8
MODE=prod
MACHINE_NAME=master
VNC_MIN_PORT=35000
VNC_MAX_PORT=35999
QEMU_UID=107
QEMU_GID=107
EXTRA_K8S_IPS=`}
                  />
                </div>
              </div>
            </section>

            <section id="slaves" className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground uppercase tracking-[0.16em]">
                4. Slave
              </h2>
              <p className="text-muted-foreground">
                Repeat for each internal slave. The local slave on the master is already handled in the master setup2.sh.
              </p>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Clone the repo</h3>
                  <CodeBlock
                    code={`sudo dnf install git -y

git clone https://github.com/Maruqes/HyperHive
cd HyperHive/scripts/main/slave`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Run setup1.sh</h3>
                  <div className="text-sm text-muted-foreground space-y-2">
                    <ol className="list-decimal pl-5 space-y-1">
                      <li>Reset the root password (do not forget it, you will need it later).</li>
                      <li>Which interface is connected to 512rede (it will be renamed to 512rede).</li>
                      <li>Install all dependencies.</li>
                      <li>Restart the machine.</li>
                    </ol>
                  </div>
                  <CodeBlock code="sudo ./setup1.sh" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Run setup2.sh</h3>
                  <div className="rounded-lg border border-border/50 bg-[rgba(5,8,16,0.5)] p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground">Slave setup2.sh fields (short)</p>
                    <ul className="mt-2 space-y-1">
                      <li><strong>MASTER_IP</strong> - master node IP on 512rede.</li>
                      <li><strong>SLAVE_IP</strong> - this slave&apos;s IP.</li>
                      <li><strong>OTHER_SLAVE_IPS</strong> - other nodes (comma-separated, no self).</li>
                      <li><strong>DIRTY_RATIO_PERCENT</strong> - max dirty RAM before sync.</li>
                      <li><strong>DIRTY_BACKGROUND_RATIO_PERCENT</strong> - start background flush threshold.</li>
                      <li><strong>MODE</strong> - prod or dev environment.</li>
                      <li><strong>MACHINE_NAME</strong> - unique node name.</li>
                      <li><strong>VNC_MIN_PORT / VNC_MAX_PORT</strong> - VNC port range for this node.</li>
                      <li><strong>QEMU_UID / QEMU_GID</strong> - user/group IDs for QEMU/libvirt.</li>
                      <li><strong>EXTRA_K8S_IPS (optional)</strong> - extra IPs for Kubernetes integration.</li>
                    </ul>
                    <div className="mt-3 text-xs text-muted-foreground">
                      <p><strong>MASTER_IP:</strong> always the master IP (same on every slave).</p>
                      <p><strong>SLAVE_IP:</strong> the IP of the current slave (different on every slave).</p>
                      <p><strong>OTHER_SLAVE_IPS:</strong> all other nodes, excluding the current SLAVE_IP. You may include the master IP.</p>
                    </div>
                    <p className="mt-3 text-xs font-semibold text-red-400">
                      Careful with port ranges. Do not overlap them with other nodes or local services.
                    </p>
                  </div>
                  <CodeBlock
                    code={`cd HyperHive/scripts/main/slave
sudo ./setup2.sh`}
                  />
                  <CodeBlock
                    title="Example values (Slave 1)"
                    code={`MASTER_IP=192.168.76.128
SLAVE_IP=192.168.76.114
OTHER_SLAVE_IPS=192.168.76.128,192.168.76.78
DIRTY_RATIO_PERCENT=15
DIRTY_BACKGROUND_RATIO_PERCENT=8
MODE=prod
MACHINE_NAME=slave-01
VNC_MIN_PORT=35000
VNC_MAX_PORT=35999
QEMU_UID=107
QEMU_GID=107
EXTRA_K8S_IPS=`}
                  />
                  <CodeBlock
                    title="Example values (Slave 2)"
                    code={`MASTER_IP=192.168.76.128
SLAVE_IP=192.168.76.78
OTHER_SLAVE_IPS=192.168.76.128,192.168.76.114
DIRTY_RATIO_PERCENT=15
DIRTY_BACKGROUND_RATIO_PERCENT=8
MODE=prod
MACHINE_NAME=slave-02
VNC_MIN_PORT=36000
VNC_MAX_PORT=36999
QEMU_UID=107
QEMU_GID=107
EXTRA_K8S_IPS=`}
                  />
                </div>
              </div>
            </section>

            <section id="final" className="space-y-6">
              <h2 className="text-3xl font-semibold text-foreground uppercase tracking-[0.16em]">
                5. Final run
              </h2>
              <p className="text-muted-foreground">Build and start services.</p>

              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Master: first run</h3>
                  <CodeBlock
                    title="Local slave (on master)"
                    code={`cd HyperHive/slave
make`}
                  />
                  <CodeBlock
                    title="Master"
                    code={`cd HyperHive/master
make`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Master: PM2</h3>
                  <p className="text-sm text-muted-foreground">
                    Edit the paths to your absolute folders. Do not forget to replace <code>/path/to/</code>.
                  </p>
                  <CodeBlock
                    title="Create the PM2 config file"
                    code={`cd HyperHive/master
nano ecosystem.config.js`}
                  />
                  <CodeBlock
                    title="ecosystem.config.js (Master + Local Slave)"
                    code={`module.exports = {
  apps: [
    {
      name: "hyperhive-master",
      script: "./512SvMan",
      cwd: "/path/to/HyperHive/master",
      autorestart: true,
      max_restarts: 0,
      min_uptime: "10s",
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
      },
    },
    {
      name: "hyperhive-slave",
      script: "./slave",
      cwd: "/path/to/HyperHive/slave",
      autorestart: true,
      max_restarts: 0,
      min_uptime: "10s",
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};`}
                  />
                  <CodeBlock
                    title="Start services"
                    code={`sudo pm2 start ecosystem.config.js
sudo pm2 save
sudo pm2 startup systemd -u root --hp /root`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Slave: first run</h3>
                  <CodeBlock
                    code={`cd HyperHive/slave
make`}
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Slave: PM2</h3>
                  <p className="text-sm text-muted-foreground">
                    Edit the path to your absolute folder. Do not forget to replace <code>/path/to/</code>.
                  </p>
                  <CodeBlock
                    title="Create the PM2 config file"
                    code={`cd HyperHive/slave
nano ecosystem.config.js`}
                  />
                  <CodeBlock
                    title="ecosystem.config.js (Slave Only)"
                    code={`module.exports = {
  apps: [
    {
      name: "hyperhive-slave",
      script: "./slave",
      cwd: "/path/to/HyperHive/slave",
      autorestart: true,
      max_restarts: 0,
      min_uptime: "10s",
      restart_delay: 5000,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};`}
                  />
                  <CodeBlock
                    title="Start service"
                    code={`sudo pm2 start ecosystem.config.js
sudo pm2 save
sudo pm2 startup systemd -u root --hp /root`}
                  />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
