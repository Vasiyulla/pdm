"use client"

import { Navbar } from "@/components/navbar"
import { useState, useRef, useEffect } from "react"
import { Send, Loader2, Globe } from "lucide-react"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
}

type Language = "en" | "es" | "fr" | "de" | "zh" | "ar" | "ja" | "pt"

const translations: Record<Language, any> = {
  en: {
    title: "AI Maintenance Assistant",
    description: "Ask questions about your equipment, maintenance schedules, and predictive insights",
    greeting:
      "Hello! I'm your AI Maintenance Assistant. I can help you with equipment diagnostics, maintenance scheduling, and predictive insights. What would you like to know?",
    suggestedQuestions: "Suggested questions:",
    placeholder: "Ask about equipment status, maintenance, or predictions...",
    thinking: "Thinking...",
    sampleQuestions: [
      "What is the current equipment health status?",
      "When is the next scheduled maintenance?",
      "Explain the recent anomaly detected",
      "How can I improve equipment efficiency?",
    ],
    responses: {
      health:
        "Current system health is at 94%. All major components are operating within normal parameters. Motor A and B are performing optimally, and the bearing assembly shows a minor increase in temperature that should be monitored.",
      maintenance:
        "Based on predictive analysis, the next scheduled maintenance is due in 3 days for the Gearbox. The Drive Belt should be inspected during the same service window. I recommend scheduling this during the next available maintenance window.",
      anomaly:
        "The recent anomaly detected was a temporary vibration spike in the Gearbox assembly at 14:32 today. This has been classified as a minor anomaly with a 2% probability of indicating a future failure. Continued monitoring is recommended.",
      efficiency:
        "To improve equipment efficiency: 1) Reduce idle time by optimizing scheduling, 2) Ensure regular lubrication of bearing assemblies, 3) Monitor temperature trends and maintain cooling systems, 4) Update calibration parameters monthly.",
      default:
        "That's a great question about equipment maintenance and diagnostics. Based on our current data, I can provide specific insights about your equipment status, predict maintenance needs, and recommend optimization strategies. What specific aspect would you like to explore?",
    },
  },
  es: {
    title: "Asistente de Mantenimiento IA",
    description: "Haga preguntas sobre su equipo, cronogramas de mantenimiento e información predictiva",
    greeting:
      "¡Hola! Soy tu Asistente de Mantenimiento IA. Puedo ayudarte con diagnósticos de equipos, programación de mantenimiento e información predictiva. ¿Qué te gustaría saber?",
    suggestedQuestions: "Preguntas sugeridas:",
    placeholder: "Pregunta sobre el estado del equipo, mantenimiento o predicciones...",
    thinking: "Pensando...",
    sampleQuestions: [
      "¿Cuál es el estado actual de la salud del equipo?",
      "¿Cuándo está programado el próximo mantenimiento?",
      "Explicar la anomalía detectada recientemente",
      "¿Cómo puedo mejorar la eficiencia del equipo?",
    ],
    responses: {
      health:
        "La salud del sistema actual es del 94%. Todos los componentes principales funcionan dentro de los parámetros normales. Los motores A y B funcionan óptimamente, y el conjunto de cojinetes muestra un ligero aumento de temperatura que debe monitorearse.",
      maintenance:
        "Basado en análisis predictivos, el próximo mantenimiento programado vence en 3 días para la Caja de Cambios. La Correa de Transmisión debe inspeccionarse durante la misma ventana de servicio. Recomiendo programar esto durante la próxima ventana de mantenimiento disponible.",
      anomaly:
        "La anomalía detectada recientemente fue un pico temporal de vibración en el conjunto de la Caja de Cambios a las 14:32 hoy. Se ha clasificado como una anomalía menor con una probabilidad del 2% de indicar una falla futura. Se recomienda monitoreo continuo.",
      efficiency:
        "Para mejorar la eficiencia del equipo: 1) Reducir el tiempo de inactividad optimizando la programación, 2) Garantizar lubricación regular de conjuntos de cojinetes, 3) Monitorear tendencias de temperatura y mantener sistemas de enfriamiento, 4) Actualizar parámetros de calibración mensualmente.",
      default:
        "Esa es una excelente pregunta sobre mantenimiento y diagnóstico de equipos. Basado en nuestros datos actuales, puedo proporcionar información específica sobre el estado de su equipo, predecir necesidades de mantenimiento y recomendar estrategias de optimización. ¿Qué aspecto específico desea explorar?",
    },
  },
  fr: {
    title: "Assistant de Maintenance IA",
    description: "Posez des questions sur votre équipement, les calendriers de maintenance et les prévisions",
    greeting:
      "Bonjour! Je suis votre Assistant de Maintenance IA. Je peux vous aider avec les diagnostics d'équipement, la planification de la maintenance et les prévisions. Que souhaitez-vous savoir?",
    suggestedQuestions: "Questions suggérées:",
    placeholder: "Posez des questions sur l'état de l'équipement, la maintenance ou les prévisions...",
    thinking: "Réflexion...",
    sampleQuestions: [
      "Quel est l'état actuel de la santé de l'équipement?",
      "Quand est prévue la prochaine maintenance?",
      "Expliquez l'anomalie détectée récemment",
      "Comment puis-je améliorer l'efficacité de l'équipement?",
    ],
    responses: {
      health:
        "L'état actuel de la santé du système est de 94%. Tous les composants principaux fonctionnent dans les paramètres normaux. Les moteurs A et B fonctionnent de manière optimale, et l'assemblage des roulements montre une légère augmentation de température qui doit être surveillée.",
      maintenance:
        "Sur la base de l'analyse prédictive, la prochaine maintenance prévue est due dans 3 jours pour la Boîte de Vitesses. La Courroie d'Entraînement doit être inspectée lors de la même fenêtre d'entretien. Je recommande de programmer cela au cours de la prochaine fenêtre de maintenance disponible.",
      anomaly:
        "L'anomalie détectée récemment était une pointe temporaire de vibration dans l'assemblage de la Boîte de Vitesses à 14h32 aujourd'hui. Cela a été classé comme une anomalie mineure avec une probabilité de 2% d'indiquer une défaillance future. Une surveillance continue est recommandée.",
      efficiency:
        "Pour améliorer l'efficacité de l'équipement: 1) Réduire les temps d'arrêt en optimisant la planification, 2) Assurer une lubrification régulière des assemblages de roulements, 3) Surveiller les tendances de température et maintenir les systèmes de refroidissement, 4) Mettre à jour les paramètres d'étalonnage mensuellement.",
      default:
        "C'est une excellente question sur la maintenance et le diagnostic des équipements. Sur la base de nos données actuelles, je peux fournir des informations spécifiques sur l'état de votre équipement, prévoir les besoins de maintenance et recommander des stratégies d'optimisation. Quel aspect spécifique souhaitez-vous explorer?",
    },
  },
  de: {
    title: "KI-Wartungsassistent",
    description: "Stellen Sie Fragen zu Ihrer Ausrüstung, Wartungsplänen und Vorhersageerkenntnissen",
    greeting:
      "Hallo! Ich bin Ihr KI-Wartungsassistent. Ich kann Ihnen bei Gerätedustrie, Wartungsplanung und Vorhersageanalysen helfen. Was möchten Sie wissen?",
    suggestedQuestions: "Vorgeschlagene Fragen:",
    placeholder: "Fragen Sie nach Gerätestatus, Wartung oder Vorhersagen...",
    thinking: "Denke nach...",
    sampleQuestions: [
      "Wie ist der aktuelle Gesundheitsstatus des Geräts?",
      "Wann ist die nächste geplante Wartung fällig?",
      "Erklären Sie die kürzlich erkannte Anomalie",
      "Wie kann ich die Geräteeffizienz verbessern?",
    ],
    responses: {
      health:
        "Der aktuelle Systemgesundheitsstatus liegt bei 94%. Alle Hauptkomponenten arbeiten innerhalb normaler Parameter. Motor A und B funktionieren optimal, und die Lagergruppe zeigt einen leichten Temperaturanstieg, der überwacht werden sollte.",
      maintenance:
        "Basierend auf Vorhersageanalysen ist die nächste geplante Wartung in 3 Tagen für das Getriebe fällig. Der Antriebsriemen sollte während des gleichen Wartungsfensters überprüft werden. Ich empfehle, dies während des nächsten verfügbaren Wartungsfensters einzuplanen.",
      anomaly:
        "Die kürzlich erkannte Anomalie war eine vorübergehende Vibrationsspitze in der Getriebegruppe um 14:32 Uhr heute. Dies wurde als eine kleinere Anomalie mit einer Wahrscheinlichkeit von 2% für einen künftigen Ausfall eingestuft. Kontinuierliche Überwachung wird empfohlen.",
      efficiency:
        "Um die Geräteeffizienz zu verbessern: 1) Reduzieren Sie Ausfallzeiten durch Optimierung der Planung, 2) Stellen Sie regelmäßige Schmierung von Lagergruppen sicher, 3) Überwachen Sie Temperaturtrends und halten Sie Kühlsysteme gewartet, 4) Aktualisieren Sie Kalibrierparameter monatlich.",
      default:
        "Das ist eine großartige Frage zu Gerätewartung und -diagnose. Basierend auf unseren aktuellen Daten kann ich spezifische Einblicke zum Status Ihrer Ausrüstung geben, Wartungsanforderungen vorhersagen und Optimierungsstrategien empfehlen. Welchen spezifischen Aspekt möchten Sie erkunden?",
    },
  },
  zh: {
    title: "人工智能维护助手",
    description: "提出关于您的设备、维护时间表和预测见解的问题",
    greeting: "您好！我是您的人工智能维护助手。我可以帮助您进行设备诊断、维护计划和预测分析。您想了解什么？",
    suggestedQuestions: "建议的问题:",
    placeholder: "询问设备状态、维护或预测...",
    thinking: "思考中...",
    sampleQuestions: [
      "当前设备健康状态如何？",
      "下一次定期维护何时进行？",
      "解释最近检测到的异常",
      "我如何改进设备效率？",
    ],
    responses: {
      health:
        "当前系统健康状态为94%。所有主要组件均在正常参数范围内运行。电动机A和B运行最优，轴承组件显示轻微温度升高，应继续监测。",
      maintenance:
        "根据预测分析，下一次定期维护将在3天后对齿轮箱进行。驱动带应在同一服务窗口期间进行检查。我建议在下一个可用的维护窗口期间安排此操作。",
      anomaly:
        "最近检测到的异常是今天14:32在齿轮箱组件中出现的临时振动峰值。这已被分类为轻微异常，有2%的概率表示未来可能发生故障。建议继续监测。",
      efficiency:
        "要改进设备效率：1)通过优化调度减少闲置时间，2)确保轴承组件的定期润滑，3)监测温度趋势并维护冷却系统，4)每月更新校准参数。",
      default:
        "这是关于设备维护和诊断的很好的问题。根据我们当前的数据，我可以提供有关您的设备状态的具体见解、预测维护需求并推荐优化策略。您想探索哪个具体方面？",
    },
  },
  ar: {
    title: "مساعد الصيانة بالذكاء الاصطناعي",
    description: "اطرح أسئلة حول معدتك وجداول الصيانة والرؤى التنبؤية",
    greeting:
      "مرحبا! أنا مساعد الصيانة بالذكاء الاصطناعي. يمكنني مساعدتك في تشخيص المعدات وجدولة الصيانة والرؤى التنبؤية. ماذا تود أن تعرف؟",
    suggestedQuestions: "الأسئلة المقترحة:",
    placeholder: "اسأل عن حالة المعدات أو الصيانة أو التنبؤات...",
    thinking: "جاري التفكير...",
    sampleQuestions: [
      "ما هي حالة صحة المعدات الحالية؟",
      "متى موعد الصيانة المجدولة التالية؟",
      "شرح الشذوذ المكتشف مؤخرا",
      "كيف يمكنني تحسين كفاءة المعدات؟",
    ],
    responses: {
      health:
        "حالة صحة النظام الحالية 94٪. جميع المكونات الرئيسية تعمل ضمن المعاملات الطبيعية. المحرك أ والمحرك ب يعملان بشكل مثالي، وتجميع المحمل يظهر ارتفاعا طفيفا في درجة الحرارة يجب مراقبته.",
      maintenance:
        "استنادا إلى التحليل التنبؤي، من المقرر إجراء الصيانة المجدولة التالية خلال 3 أيام لصندوق التروس. يجب فحص حزام القيادة أثناء نفس نافذة الخدمة. أوصي بجدولة هذا خلال نافذة الصيانة المتاحة التالية.",
      anomaly:
        "الشذوذ المكتشف مؤخرا كان ارتفاعا مؤقتا للاهتزاز في تجميع صندوق التروس في الساعة 14:32 اليوم. تم تصنيفه على أنه شذوذ طفيف باحتمالية 2٪ للإشارة إلى فشل مستقبلي. يوصى بمراقبة مستمرة.",
      efficiency:
        "لتحسين كفاءة المعدات: 1) تقليل وقت التوقف عن طريق تحسين الجدولة، 2) ضمان التزييت المنتظم لتجميعات المحمل، 3) مراقبة اتجاهات درجة الحرارة والحفاظ على أنظمة التبريد، 4) تحديث معاملات المعايرة شهريا.",
      default:
        "هذا سؤال رائع عن صيانة وتشخيص المعدات. بناء على بيانات النظام الحالية، يمكنني تقديم رؤى محددة عن حالة معداتك والتنبؤ باحتياجات الصيانة وتوصية استراتيجيات التحسين. ما الجانب المحدد الذي تود استكشافه؟",
    },
  },
  ja: {
    title: "AIメンテナンスアシスタント",
    description: "機器、メンテナンススケジュール、および予測インサイトについて質問してください",
    greeting:
      "こんにちは！AIメンテナンスアシスタントです。機器の診断、メンテナンススケジューリング、予測分析をお手伝いできます。何をお知りになりたいですか？",
    suggestedQuestions: "提案される質問:",
    placeholder: "機器のステータス、メンテナンス、または予測について質問してください...",
    thinking: "考え中...",
    sampleQuestions: [
      "現在の機器の健全性状態はどうですか？",
      "次の定期メンテナンスはいつですか？",
      "最近検出された異常を説明してください",
      "機器の効率を改善するにはどうすればよいですか？",
    ],
    responses: {
      health:
        "現在のシステムの健全性は94％です。すべての主要コンポーネントが正常なパラメータ内で動作しています。モーターAとBは最適に動作しており、ベアリングアセンブリは温度がわずかに上昇しており、監視が必要です。",
      maintenance:
        "予測分析に基づいて、次の定期メンテナンスはギアボックスで3日以内に期限切れになります。ドライブベルトは同じサービスウィンドウ中に検査する必要があります。次の利用可能なメンテナンスウィンドウ中にこれをスケジュールすることをお勧めします。",
      anomaly:
        "最近検出された異常は、本日14:32のギアボックスアセンブリの一時的な振動スパイクでした。これは、将来の故障を示す可能性が2％の軽微な異常として分類されています。継続的な監視をお勧めします。",
      efficiency:
        "機器の効率を改善するには：1）スケジューリングを最適化してアイドルタイムを削減、2）ベアリングアセンブリの定期的な潤滑を確保、3）温度トレンドを監視して冷却システムを維持、4）毎月キャリブレーションパラメータを更新します。",
      default:
        "これは機器のメンテナンスと診断に関する素晴らしい質問です。現在のデータに基づいて、機器のステータスについての具体的なインサイト、メンテナンスニーズの予測、最適化戦略の推奨を提供できます。探索したい具体的な側面は何ですか？",
    },
  },
  pt: {
    title: "Assistente de Manutenção com IA",
    description: "Faça perguntas sobre seu equipamento, cronogramas de manutenção e insights preditivos",
    greeting:
      "Olá! Sou seu Assistente de Manutenção com IA. Posso ajudá-lo com diagnóstico de equipamentos, planejamento de manutenção e insights preditivos. O que você gostaria de saber?",
    suggestedQuestions: "Perguntas sugeridas:",
    placeholder: "Pergunte sobre status do equipamento, manutenção ou previsões...",
    thinking: "Pensando...",
    sampleQuestions: [
      "Qual é o status atual de saúde do equipamento?",
      "Quando está agendada a próxima manutenção?",
      "Explique a anomalia detectada recentemente",
      "Como posso melhorar a eficiência do equipamento?",
    ],
    responses: {
      health:
        "O status atual de saúde do sistema está em 94%. Todos os componentes principais estão operando dentro dos parâmetros normais. Os motores A e B estão funcionando de forma otimizada, e o conjunto de rolamentos mostra um aumento leve de temperatura que deve ser monitorado.",
      maintenance:
        "Com base na análise preditiva, a próxima manutenção agendada vence em 3 dias para a Caixa de Engrenagens. A Correia de Transmissão deve ser inspecionada durante a mesma janela de serviço. Recomendo agendar isto durante a próxima janela de manutenção disponível.",
      anomaly:
        "A anomalia detectada recentemente foi um pico temporário de vibração no conjunto da Caixa de Engrenagens às 14h32 de hoje. Isto foi classificado como uma anomalia menor com 2% de probabilidade de indicar uma falha futura. É recomendado monitoramento contínuo.",
      efficiency:
        "Para melhorar a eficiência do equipamento: 1) Reduzir o tempo de inatividade otimizando a programação, 2) Garantir lubrificação regular dos conjuntos de rolamentos, 3) Monitorar tendências de temperatura e manter sistemas de resfriamento, 4) Atualizar parâmetros de calibração mensalmente.",
      default:
        "Esta é uma ótima pergunta sobre manutenção e diagnóstico de equipamentos. Com base em nossos dados atuais, posso fornecer insights específicos sobre o status do seu equipamento, prever necessidades de manutenção e recomendar estratégias de otimização. Qual aspecto específico você gostaria de explorar?",
    },
  },
}

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [language, setLanguage] = useState<Language>("en")
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const t = translations[language]
  const languages: { code: Language; name: string }[] = [
    { code: "en", name: "English" },
    { code: "es", name: "Español" },
    { code: "fr", name: "Français" },
    { code: "de", name: "Deutsch" },
    { code: "zh", name: "中文" },
    { code: "ar", name: "العربية" },
    { code: "ja", name: "日本語" },
    { code: "pt", name: "Português" },
  ]

  useEffect(() => {
    setMessages([
      {
        id: "1",
        type: "assistant",
        content: t.greeting,
        timestamp: new Date(),
      },
    ])
  }, [language])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return

    const userMsg: Message = {
      id: Date.now().toString(),
      type: "user",
      content: userMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setIsLoading(true)

    setTimeout(() => {
      let response = t.responses.default

      const lowerMessage = userMessage.toLowerCase()
      if (
        lowerMessage.includes("health") ||
        lowerMessage.includes("status") ||
        lowerMessage.includes("salud") ||
        lowerMessage.includes("santé") ||
        lowerMessage.includes("santé") ||
        lowerMessage.includes("健康") ||
        lowerMessage.includes("صحة") ||
        lowerMessage.includes("健全")
      ) {
        response = t.responses.health
      } else if (
        lowerMessage.includes("maintenance") ||
        lowerMessage.includes("schedule") ||
        lowerMessage.includes("mantenimiento") ||
        lowerMessage.includes("maintenance") ||
        lowerMessage.includes("次") ||
        lowerMessage.includes("الصيانة")
      ) {
        response = t.responses.maintenance
      } else if (
        lowerMessage.includes("anomaly") ||
        lowerMessage.includes("anomalía") ||
        lowerMessage.includes("anomalie") ||
        lowerMessage.includes("异常") ||
        lowerMessage.includes("شذوذ") ||
        lowerMessage.includes("異常")
      ) {
        response = t.responses.anomaly
      } else if (
        lowerMessage.includes("efficiency") ||
        lowerMessage.includes("improve") ||
        lowerMessage.includes("eficiencia") ||
        lowerMessage.includes("améliorer") ||
        lowerMessage.includes("改進") ||
        lowerMessage.includes("كفاءة")
      ) {
        response = t.responses.efficiency
      }

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: response,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMsg])
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 px-4 sm:px-6 lg:px-8 pb-6">
        <div className="max-w-4xl mx-auto h-full flex flex-col">
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-sidebar-foreground mb-2">{t.title}</h1>
              <p className="text-muted-foreground">{t.description}</p>
            </div>
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-lg z-10">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setShowLanguageMenu(false)
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        language === lang.code ? "bg-primary/20 text-primary" : "text-foreground"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 bg-card/50 border border-border rounded-xl p-6 mb-4 overflow-y-auto flex flex-col gap-4 min-h-96">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md xl:max-w-lg px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary/20 text-primary-foreground border border-primary/30"
                      : "bg-muted/50 text-foreground border border-border"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <span className="text-xs text-muted-foreground mt-2 block">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted/50 text-foreground border border-border px-4 py-3 rounded-lg flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm">{t.thinking}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-3">{t.suggestedQuestions}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {t.sampleQuestions.map((question: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(question)}
                    className="text-left p-3 rounded-lg bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all text-sm text-muted-foreground hover:text-foreground"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter" && !isLoading) {
                  handleSendMessage(input)
                }
              }}
              placeholder={t.placeholder}
              className="flex-1 px-4 py-3 rounded-lg bg-input border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage(input)}
              disabled={isLoading || !input.trim()}
              className="px-4 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
