"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StatisticsPage() {
  const [activeTab, setActiveTab] = useState("workforce")

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Women's Empowerment Statistics</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 text-center">
          Key statistics and data on women's empowerment in India
        </p>

        <Tabs defaultValue="workforce" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
            <TabsTrigger value="workforce">Workforce</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="health">Health</TabsTrigger>
            <TabsTrigger value="legal">Legal Rights</TabsTrigger>
          </TabsList>

          <TabsContent value="workforce" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gender Pay Gap</CardTitle>
                  <CardDescription>Women earn less than men across various sectors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Average Pay Gap in India</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "19%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Women earn 19% less than men on average</p>
                    </div>

                    <div>
                      <p className="font-medium">IT Sector Pay Gap</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">22% pay gap in the IT sector</p>
                    </div>

                    <div>
                      <p className="font-medium">Healthcare Sector Pay Gap</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "28%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">28% pay gap in healthcare</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Workforce Participation</CardTitle>
                  <CardDescription>Women's participation in the formal workforce</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Overall Workforce</span>
                      <span className="font-bold">27%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-pink-500 h-4 rounded-full" style={{ width: "27%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Corporate Leadership</span>
                      <span className="font-bold">14%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-pink-500 h-4 rounded-full" style={{ width: "14%" }}></div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Tech Industry</span>
                      <span className="font-bold">34%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-pink-500 h-4 rounded-full" style={{ width: "34%" }}></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Literacy Rates</CardTitle>
                  <CardDescription>Female literacy rates compared to male literacy rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">National Literacy Rate</p>
                      <div className="flex items-center mt-2">
                        <div className="w-1/2 pr-2">
                          <p className="text-sm mb-1">Female: 70.3%</p>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-pink-500 h-4 rounded-full" style={{ width: "70.3%" }}></div>
                          </div>
                        </div>
                        <div className="w-1/2 pl-2">
                          <p className="text-sm mb-1">Male: 84.7%</p>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-500 h-4 rounded-full" style={{ width: "84.7%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Rural Literacy Rate</p>
                      <div className="flex items-center mt-2">
                        <div className="w-1/2 pr-2">
                          <p className="text-sm mb-1">Female: 65.5%</p>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-pink-500 h-4 rounded-full" style={{ width: "65.5%" }}></div>
                          </div>
                        </div>
                        <div className="w-1/2 pl-2">
                          <p className="text-sm mb-1">Male: 82.1%</p>
                          <div className="w-full bg-gray-200 rounded-full h-4">
                            <div className="bg-blue-500 h-4 rounded-full" style={{ width: "82.1%" }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Higher Education</CardTitle>
                  <CardDescription>Women's enrollment in higher education</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Undergraduate Enrollment</p>
                      <div className="flex items-center justify-between mt-2">
                        <span>Female Students</span>
                        <span className="font-bold">49%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "49%" }}></div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">STEM Fields</p>
                      <div className="flex items-center justify-between mt-2">
                        <span>Female Students</span>
                        <span className="font-bold">32%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "32%" }}></div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Doctoral Programs</p>
                      <div className="flex items-center justify-between mt-2">
                        <span>Female Students</span>
                        <span className="font-bold">41%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-1">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "41%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="health" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Maternal Health</CardTitle>
                  <CardDescription>Statistics on maternal health and care</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Maternal Mortality Rate</p>
                      <p className="text-3xl font-bold mt-2">113</p>
                      <p className="text-sm text-gray-500">per 100,000 live births</p>
                    </div>

                    <div>
                      <p className="font-medium">Institutional Births</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "78.9%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">78.9% of births occur in healthcare facilities</p>
                    </div>

                    <div>
                      <p className="font-medium">Antenatal Care</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "51.2%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">51.2% receive full antenatal care</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Female Foeticide</CardTitle>
                  <CardDescription>Statistics on female foeticide and sex ratio</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Child Sex Ratio (0-6 years)</p>
                      <div className="flex items-center justify-center mt-2">
                        <div className="text-center px-4">
                          <p className="text-4xl font-bold">940</p>
                          <p className="text-sm text-gray-500">females per 1000 males</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Sex Ratio at Birth</p>
                      <div className="flex items-center justify-center mt-2">
                        <div className="text-center px-4">
                          <p className="text-4xl font-bold">929</p>
                          <p className="text-sm text-gray-500">females per 1000 males</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="font-medium">Missing Female Births (Estimated)</p>
                      <div className="flex items-center justify-center mt-2">
                        <div className="text-center px-4">
                          <p className="text-4xl font-bold">63,000</p>
                          <p className="text-sm text-gray-500">per year</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="legal" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Legal Protections</CardTitle>
                  <CardDescription>Key laws protecting women's rights in India</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="bg-pink-100 text-pink-800 p-1 rounded mr-2 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">PCPNDT Act, 1994</p>
                        <p className="text-sm text-gray-500">Prohibits sex determination and sex-selective abortion</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-pink-100 text-pink-800 p-1 rounded mr-2 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Protection of Women from Domestic Violence Act, 2005</p>
                        <p className="text-sm text-gray-500">Protects women from domestic violence</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-pink-100 text-pink-800 p-1 rounded mr-2 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Sexual Harassment of Women at Workplace Act, 2013</p>
                        <p className="text-sm text-gray-500">Protects women from sexual harassment at work</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-pink-100 text-pink-800 p-1 rounded mr-2 mt-0.5">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-check"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium">Maternity Benefit (Amendment) Act, 2017</p>
                        <p className="text-sm text-gray-500">Provides 26 weeks of paid maternity leave</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Legal Awareness</CardTitle>
                  <CardDescription>Women's awareness of legal rights and protections</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <p className="font-medium">Awareness of PCPNDT Act</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "38%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Only 38% of women are aware of the PCPNDT Act</p>
                    </div>

                    <div>
                      <p className="font-medium">Awareness of Domestic Violence Act</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "52%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        52% of women are aware of domestic violence protections
                      </p>
                    </div>

                    <div>
                      <p className="font-medium">Reported Cases vs. Actual Incidents</p>
                      <div className="w-full bg-gray-200 rounded-full h-4 mt-2">
                        <div className="bg-pink-500 h-4 rounded-full" style={{ width: "22%" }}></div>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">Only about 22% of incidents are reported</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
