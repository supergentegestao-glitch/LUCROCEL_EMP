import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, Linking, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';

interface MenuItem {
  title: string;
  href: string;
  isExternal?: boolean;
}

interface Screen {
  id: string;
  title: string;
  items: MenuItem[];
  logoImage?: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<string>('menu');
  const [webViewUrl, setWebViewUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const screens: { [key: string]: Screen } = {
    menu: {
      id: 'menu',
      title: 'SuperGente +LUCRO',
      logoImage: require('./assets/anuncia_site.jpg'),
      items: [
        { title: 'COMO SE FORMA O RESULTADO NA EMPRESA SUPERMERCADISTA?', href: 'screen_1' },
        { title: 'QUEM NÃO SABE PARA ONDE VAI, ESTÁ SEM RUMO!', href: 'screen_2' },
        { title: 'A SUSTENTABILIDADE DO NEGÓCIO ESTÁ NO CAPITAL DE GIRO.', href: 'screen_3' },
        { title: 'CONCEITO E APLICAÇÕES DO LUCRO BRUTO DE FEIRANTES (LBF).', href: 'screen_4' },
        { title: 'A IMPORTÂNCIA DA LOJA E DE SEU GERENTE(1).', href: 'screen_5' },
        { title: 'A IMPORTÂNCIA DA LOJA E DE SEU GERENTE(2).', href: 'screen_6' },
        { title: 'DICAS PARA UMA GESTÃO MAIS EFICAZ.', href: 'screen_7' },
        { title: 'CONCEITOS BÁSICOS PARA SEREM LEMBRADOS SEMPRE!', href: 'screen_8' },
        { title: 'TUDO ANDANDO COMO DEVERIA EM NOSSA OPERAÇÃO???', href: 'screen_9' },
        { title: 'VOCÊ É UM BOM(A) EMPRESÁRIO(A)?', href: 'screen_10' },
        { title: 'AVALIE SE VOCÊ É UM(A) BOM(A) EMPRESÁRIO(A)', href: 'file_pdf', isExternal: false },
        { title: 'PLANILHAS PARA AVALIAR SUA OPERAÇÃO E IDENTIFICAR PROBLEMAS', href: 'screen_12' },
        { title: 'SOBRE O AUTOR DO SITE.', href: 'screen_13' },
      ],
    },
    screen_1: {
      id: 'screen_1',
      title: 'COMO SE FORMA O RESULTADO NA EMPRESA SUPERMERCADISTA?',
      items: [
        { title: 'ARITMÉTICA BÁSICA PARA ENTENDER A FORMAÇÃO DO LUCRO. (PDF)', href: 'ARITMETICA_BASICA.pdf' },
        { title: 'ARITMÉTICA BÁSICA PARA ENTENDER A FORMAÇÃO DO LUCRO. (VÍDEO)', href: 'https://youtu.be/ZfU3svLxEWI', isExternal: true },
        { title: 'TENTAR MELHORAR UMA PARCELA PODE PIORAR OUTRA...(PDF)', href: 'MELHORAR.pdf' },
        { title: 'TENTAR MELHORAR UMA PARCELA PODE PIORAR OUTRA... (VÍDEO)', href: 'https://youtu.be/A-aGP0aQKiU', isExternal: true },
        { title: 'SIMULE SEU RESULTADO ALTERANDO SUAS PARCELAS. (PDF)', href: 'SIMULE.pdf' },
        { title: 'SIMULE SEU RESULTANDO ALTERANDO SUAS PARCELAS. (VÍDEO)', href: 'https://youtu.be/-DxWN5m1-TE', isExternal: true },
        { title: 'POR ONDE COMEÇAR UM PROGRAMA DE MELHORIAS DE RESULTADO? (PDF)', href: 'INICIAR_MELHORIAS.pdf' },
        { title: 'POR ONDE COMEÇAR UM PROGRAMA DE MELHORIAS DE RESULTADO? (VÍDEO)', href: 'https://youtu.be/NGzS05zudAE', isExternal: true },
      ],
    },
    screen_2: {
      id: 'screen_2',
      title: 'QUEM NÃO SABE PARA ONDE VAI, ESTÁ SEM RUMO!',
      items: [
        { title: 'FIXAR OBJETIVOS. (PDF)', href: 'FIXAR_OBJETIVOS.pdf' },
        { title: 'POSICIONAMENTO. (PDF)', href: 'POSICIONAMENTO.pdf' },
        { title: 'REGRAS DE GESTÃO. (PDF)', href: 'REGRAS_GESTAO.pdf' },
      ],
    },
    screen_3: {
      id: 'screen_3',
      title: 'A SUSTENTABILIDADE DO NEGÓCIO ESTÁ NO CAPITAL DE GIRO.',
      items: [
        { title: 'SALDO DE CAIXA. (PDF)', href: 'SALDO_CAIXA.pdf' },
        { title: 'LIQUIDEZ PARA FEIRANTES. (PDF)', href: 'LIQUIDEZ_FEIRANTES.pdf' },
        { title: 'MOVIMENTO DE CAIXA EM LOJAS. (PDF)', href: 'MOVIMENTO_CAIXA_LOJAS.pdf' },
      ],
    },
    screen_4: {
      id: 'screen_4',
      title: 'CONCEITO E APLICAÇÕES DO LUCRO BRUTO DE FEIRANTES (LBF).',
      items: [
        { title: 'CONCEITO LBF. (PDF)', href: 'CONCEITO_LBF.pdf' },
        { title: 'LBF DIÁRIA. (PDF)', href: 'LBF_DIARIA.pdf' },
      ],
    },
    screen_5: {
      id: 'screen_5',
      title: 'A IMPORTÂNCIA DA LOJA E DE SEU GERENTE(1).',
      items: [
        { title: 'IMPORTÂNCIA DA LOJA. (PDF)', href: 'IMPORTANCIA_LOJA.pdf' },
        { title: 'GERENTE COMPLETO. (PDF)', href: 'GERENTE_COMPLETO.pdf' },
      ],
    },
    screen_6: {
      id: 'screen_6',
      title: 'A IMPORTÂNCIA DA LOJA E DE SEU GERENTE(2).',
      items: [
        { title: 'CONQUISTAR CLIENTES. (PDF)', href: 'CONQUISTAR_CLIENTES.pdf' },
        { title: 'PROGRAMA DE FIDELIDADE. (PDF)', href: 'PROGRAMA_FIDELIDADE.pdf' },
      ],
    },
    screen_7: {
      id: 'screen_7',
      title: 'DICAS PARA UMA GESTÃO MAIS EFICAZ.',
      items: [
        { title: 'DICAS DE DEVOLUÇÕES. (PDF)', href: 'DICAS_DEVOLUCOES.pdf' },
        { title: 'PERDAS E QUEBRAS. (PDF)', href: 'PERDAS_QUEBRAS.pdf' },
        { title: 'INVENTÁRIOS. (PDF)', href: 'INVENTARIOS.pdf' },
      ],
    },
    screen_8: {
      id: 'screen_8',
      title: 'CONCEITOS BÁSICOS PARA SEREM LEMBRADOS SEMPRE!',
      items: [
        { title: 'NÃO MEDIDO. (PDF)', href: 'NAO_MEDIDO.pdf' },
        { title: 'CATEGORIAS. (PDF)', href: 'CATEGORIAS.pdf' },
        { title: 'EQUILÍBRIO COMPRAS E VENDAS. (PDF)', href: 'EQ_COMPRAS_VENDAS.pdf' },
        { title: 'GESTÃO DE ESTOQUES. (PDF)', href: 'GESTAO_ESTOQUES.pdf' },
      ],
    },
    screen_9: {
      id: 'screen_9',
      title: 'TUDO ANDANDO COMO DEVERIA EM NOSSA OPERAÇÃO???',
      items: [
        { title: 'INDICADORES. (PDF)', href: 'INDICADORES.pdf' },
        { title: 'MATRIZ BI. (PDF)', href: 'MATRIZ_BI.pdf' },
      ],
    },
    screen_10: {
      id: 'screen_10',
      title: 'VOCÊ É UM BOM(A) EMPRESÁRIO(A)?',
      items: [
        { title: 'MERCADO. (PDF)', href: 'MERCADO.pdf' },
        { title: 'CONCORRÊNCIA. (PDF)', href: 'CONCORRENCIA.pdf' },
        { title: 'AUMENTAR VENDAS. (PDF)', href: 'AUMENTAR VENDAS.pdf' },
        { title: 'RACIONALIZAR DESPESAS. (PDF)', href: 'RACIONALIZAR DESPESAS.pdf' },
      ],
    },
    screen_12: {
      id: 'screen_12',
      title: 'PLANILHAS PARA AVALIAR SUA OPERAÇÃO E IDENTIFICAR PROBLEMAS',
      items: [
        { title: 'BASE FORMULÁRIOS. (XLSX)', href: 'BASE_FORMULARIOS.xlsx' },
        { title: 'DEPÓSITOS E CÂMARAS. (XLSX)', href: 'DEPOSITOS_CAMARAS.xlsx' },
        { title: 'FIAMBRERIA E LATICÍNIOS. (XLSX)', href: 'FIAMBRERIA_LATICINIOS.xlsx' },
        { title: 'HORTIFRUTIGRANJEIROS. (XLSX)', href: 'HORTIFRUTIGRANJEIROS.xlsx' },
        { title: 'PADARIA E CONFEITARIA. (XLSX)', href: 'PADARIA_CONFEITARIA..xlsx' },
        { title: 'SALÃO DA LOJA. (XLSX)', href: 'SALAO_LOJA.xlsx' },
        { title: 'SETOR COMERCIAL. (XLSX)', href: 'SETOR_COMERCIAL.xlsx' },
        { title: 'FRENTE LOJA. (XLSX)', href: 'FRENTE_LOJA.xlsx' },
      ],
    },
    screen_13: {
      id: 'screen_13',
      title: 'SOBRE O AUTOR DO SITE.',
      items: [
        { title: 'INTELIGÊNCIA ARTIFICIAL 1. (PDF)', href: 'INTELIGENCIA_ARTIFICIAL_1.pdf' },
        { title: 'INTELIGÊNCIA ARTIFICIAL 2. (PDF)', href: 'INTELIGENCIA_ARTIFICIAL_2.pdf' },
        { title: 'MUDANÇA NAS EMPRESAS. (PDF)', href: 'MUDANCA_EMPRESAS.pdf' },
        { title: 'MARKETING DIGITAL. (PDF)', href: 'MARKETING_DIGITAL.pdf' },
      ],
    },
  };

  const handleMenuPress = (href: string) => {
    if (href.startsWith('http')) {
      Linking.openURL(href);
    } else if (href.endsWith('.pdf') || href.endsWith('.xlsx')) {
      const fileUri = `${FileSystem.documentDirectory}${href}`;
      setWebViewUrl(`file://${FileSystem.documentDirectory}../assets/${href}`);
      setCurrentScreen('viewer');
    } else {
      setCurrentScreen(href);
    }
  };

  const handleBack = () => {
    if (currentScreen === 'viewer') {
      setCurrentScreen('menu');
    } else if (currentScreen !== 'menu') {
      setCurrentScreen('menu');
    }
  };

  const currentScreenData = screens[currentScreen] || screens.menu;

  return (
    <View style={styles.container}>
      {currentScreen === 'viewer' ? (
        <View style={styles.viewerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>← VOLTAR</Text>
          </TouchableOpacity>
          <WebView
            source={{ uri: webViewUrl }}
            style={styles.webview}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator size="large" color="#FF0000" />}
          />
        </View>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            {currentScreenData.logoImage && (
              <Image source={currentScreenData.logoImage} style={styles.logo} />
            )}
            <Text style={styles.tagline}>GESTÃO "Feijão com Arroz"</Text>
          </View>

          {currentScreen !== 'menu' && (
            <View style={styles.pageTitle}>
              <Text style={styles.pageTitleText}>{currentScreenData.title}</Text>
            </View>
          )}

          <View style={styles.menuList}>
            {currentScreenData.items.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={() => handleMenuPress(item.href)}
              >
                <Text style={styles.menuItemText}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {currentScreen !== 'menu' && (
            <TouchableOpacity style={styles.backButtonBottom} onPress={handleBack}>
              <Text style={styles.backButtonText}>← VOLTAR AO MENU PRINCIPAL</Text>
            </TouchableOpacity>
          )}

          <View style={styles.footer}>
            <Text style={styles.footerText}>© 2025 PROGRAMA +LUCRO ====> Todos os direitos reservados.</Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: '70%',
    height: 80,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: 'bold',
  },
  pageTitle: {
    backgroundColor: '#FF0000',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  pageTitleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  menuList: {
    marginBottom: 15,
  },
  menuItem: {
    backgroundColor: '#2563eb',
    borderRadius: 3,
    marginBottom: 5,
    padding: 12,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  backButtonBottom: {
    backgroundColor: '#FF0000',
    borderRadius: 3,
    padding: 12,
    marginBottom: 15,
  },
  backButton: {
    backgroundColor: '#FF0000',
    borderRadius: 3,
    padding: 12,
    marginBottom: 10,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#444',
    paddingTop: 10,
    marginTop: 10,
  },
  footerText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  viewerContainer: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
    paddingHorizontal: 10,
  },
  webview: {
    flex: 1,
  },
});
